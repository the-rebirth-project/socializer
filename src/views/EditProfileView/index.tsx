import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { navigate, RouteComponentProps } from '@reach/router';
import { useUserState } from '../../contexts/UserContext';
import { EditProfileForm } from '../../components/specific/EditProfileForm';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { TextLoader } from '../../components/shared/TextLoader';
import { SubHeading } from '../../components/shared/SubHeading';
import { Wrapper, ActionsAndFormWrapper, SeriousFancyButton } from './styles';

export const EditProfileView: React.FC<RouteComponentProps> = () => {
  const db = firebase.firestore();
  const { fetchingUser, userId } = useUserState();
  const [deletingAccount, setDeletingAccount] = useState(false);

  const deleteAccount = async () => {
    try {
      setDeletingAccount(true);
      await db
        .collection('users')
        .doc(userId)
        .delete();
      // delete the user from firebase auth
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            await user.delete();
          } catch (err) {
            if (err.code === 'auth/requires-recent-login') {
              navigate('/reauthenticate');
            }
          }
        } else {
          navigate('/login');
        }
      });

      navigate('/login');
    } catch (err) {
      // TODO: Handle error
      console.log(err);
    }
    setDeletingAccount(false);
  };

  return (
    <LoadingSpinner loading={fetchingUser ? 1 : 0} centerSpinner>
      <Wrapper>
        <SubHeading>Edit Profile</SubHeading>
        <ActionsAndFormWrapper>
          <EditProfileForm />
          <SeriousFancyButton onClick={deleteAccount}>
            {!deletingAccount ? (
              'Delete Account'
            ) : (
              <TextLoader loading={deletingAccount}>Deleting...</TextLoader>
            )}
          </SeriousFancyButton>
        </ActionsAndFormWrapper>
      </Wrapper>
    </LoadingSpinner>
  );
};
