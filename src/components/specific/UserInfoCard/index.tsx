import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { useUserState } from '../../../contexts/UserContext';
import {
  useUserProfileState,
  useUserProfileDispatch,
} from '../../../contexts/UserProfileContext';
import { useMounted } from '../../../hooks/useMounted';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { SecondaryButton } from '../../shared/SecondaryButton';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Text } from '../../shared/Text';
import {
  Wrapper,
  UserInfoContainer,
  UsernameContainer,
  UserBio,
  ActionButtonContainer,
  SubscribeButtonContainer,
  StyledSecondaryButton,
} from './styles';
import uuid from 'uuid';

export const UserInfoCard: React.FC = () => {
  const db = firebase.firestore();
  const isMounted = useMounted();
  const userState = useUserState();
  const alert = useAlert();
  const userProfileDispatch = useUserProfileDispatch();
  const { userData, isSubscribed, authorizedToEdit } = useUserProfileState();
  // also applies for when you're disconnecting
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const onSubscribeClick = async () => {
    isMounted.current && setIsSubscribing(true);

    try {
      if (isSubscribed) {
        // unsubscribe if already subscribed
        await db
          .collection('users')
          .doc(userData.userId)
          .collection('subscribers')
          .doc(userState.userId)
          .delete();

        isMounted.current &&
          userProfileDispatch({ type: 'SET_IS_SUBSCRIBED', payload: false });
      } else {
        // else subscribe
        await db
          .collection('users')
          .doc(userData.userId)
          .collection('subscribers')
          .doc(userState.userId)
          .set({
            userId: userState.userId,
            profileImageURL: userState.userProfile,
          });

        // send notification
        await db
          .collection('users')
          .doc(userData.userId)
          .collection('notifications')
          .doc(uuid())
          .set({
            userId: userState.userId,
            message: 'subscribed to you.',
            createdAt: new Date().toISOString(),
          });

        isMounted.current &&
          userProfileDispatch({ type: 'SET_IS_SUBSCRIBED', payload: true });
      }
    } catch (e) {
      //TODO: Handle error
      console.log(e);
    }

    isMounted.current && setIsSubscribing(false);
  };

  // if user is authorized to edit the profile info, we navigate them to an edit profile form
  const onEditClick = () => {
    navigate('/account/edit');
  };

  const onSignOutClick = async () => {
    isMounted.current && setSigningOut(true);
    await firebase.auth().signOut();
    alert.success('Successfully signed out');
    isMounted.current && setSigningOut(false);
    navigate('/login');
  };

  return (
    <Wrapper>
      <UserInfoContainer>
        <CircleAvatar
          imgUrl={userData.profileImageURL ? userData.profileImageURL : ''}
          sizeScaling={2}
        />
        <UsernameContainer>
          <Text weight={700} size={1.8}>
            {userData?.userHandle}
          </Text>
          <Text opacity={0.7} size={1.2}>
            {userData.numSubscribers} Subscribers | {userData.numPosts} Posts |{' '}
            {userData.numSeeds} Seeds
          </Text>
          <Text opacity={0.7} size={1.2}>
            {userData.location}
          </Text>
        </UsernameContainer>
        <UserBio>
          <Text size={1.2}>{userData.bio}</Text>
        </UserBio>
        {authorizedToEdit ? (
          <ActionButtonContainer>
            <StyledSecondaryButton onClick={onEditClick}>
              Edit
            </StyledSecondaryButton>
            <StyledSecondaryButton
              onClick={onSignOutClick}
              disabled={signingOut}
              serious
            >
              Sign out
            </StyledSecondaryButton>
          </ActionButtonContainer>
        ) : (
          <SubscribeButtonContainer>
            <OpacityLoader loading={isSubscribing ? 1 : 0} defaultOpacity={1}>
              <SecondaryButton
                onClick={onSubscribeClick}
                small
                disabled={isSubscribing}
                serious={isSubscribed}
              >
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              </SecondaryButton>
            </OpacityLoader>
          </SubscribeButtonContainer>
        )}
      </UserInfoContainer>
    </Wrapper>
  );
};
