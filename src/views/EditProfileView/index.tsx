import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAlert } from 'react-alert';
import { navigate, RouteComponentProps } from '@reach/router';
import { useUserState } from '../../contexts/UserContext';
import { EditProfileForm } from '../../components/specific/EditProfileForm';
import { ChangeProfilePhoto } from '../../components/specific/ChangeProfilePhoto';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { TextLoader } from '../../components/shared/TextLoader';
import { SubHeading } from '../../components/shared/SubHeading';
import { SecondaryButton } from '../../components/shared/SecondaryButton';
import { Page } from '../../components/shared/Page';
import { Wrapper, ActionsAndFormWrapper } from './styles';

export const EditProfileView: React.FC<RouteComponentProps> = () => {
  const db = firebase.firestore();
  const { fetchingUser, userId } = useUserState();
  const [deletingAccount, setDeletingAccount] = useState(false);
  const alert = useAlert();

  const deleteAccount = async () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        setDeletingAccount(true);
        try {
          const userIdToDelete = userId;
          await db
            .collection('users')
            .doc(userIdToDelete)
            .delete();
          await user.delete();
          alert.success('Successfully deleted account');
          navigate('/login');
        } catch (err) {
          if (err.code === 'auth/requires-recent-login') {
            alert.info('Please reauthenticate your account to proceed');
            navigate('/reauthenticate');
          } else {
            alert.error(`Couldn't delete your account`);
          }
        }
      } else {
        navigate('/login');
      }
    });
    setDeletingAccount(false);
  };

  return (
    <LoadingSpinner loading={fetchingUser ? 1 : 0} centerSpinner>
      <Page>
        <Wrapper>
          <SubHeading>Edit Profile</SubHeading>
          <ActionsAndFormWrapper>
            <ChangeProfilePhoto />
            <EditProfileForm />
            <SecondaryButton onClick={deleteAccount} serious>
              {!deletingAccount && 'Delete'}
              <TextLoader loading={deletingAccount}>Deleting...</TextLoader>
            </SecondaryButton>
          </ActionsAndFormWrapper>
        </Wrapper>
      </Page>
    </LoadingSpinner>
  );
};
