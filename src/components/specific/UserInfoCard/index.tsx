import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useUserState } from '../../../contexts/UserContext';
import {
  useUserProfileState,
  useUserProfileDispatch
} from '../../../contexts/UserProfileContext';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Text } from '../../shared/Text';
import {
  Wrapper,
  UserInfoContainer,
  UsernameContainer,
  UserBio,
  StyledFancyButton
} from './styles';

export const UserInfoCard: React.FC = () => {
  const db = firebase.firestore();
  const userState = useUserState();
  const userProfileDispatch = useUserProfileDispatch();
  const { userData, isSubscribed } = useUserProfileState();
  // also applies for when you're disconnecting
  const [isSubscribing, setIsSubscribing] = useState(false);

  const onSubscribeClick = async () => {
    setIsSubscribing(true);

    try {
      if (isSubscribed) {
        // unsubscribe if already subscribed
        await db
          .collection('users')
          .doc(userData.userHandle)
          .collection('subscribers')
          .doc(userState.userHandle)
          .delete();

        userProfileDispatch({ type: 'SET_IS_SUBSCRIBED', payload: false });
      } else {
        // else subscribe
        await db
          .collection('users')
          .doc(userData.userHandle)
          .collection('subscribers')
          .doc(userState.userHandle)
          .set({
            userHandle: userState.userHandle,
            profileImageURL: userState.userProfile
          });

        userProfileDispatch({ type: 'SET_IS_SUBSCRIBED', payload: true });
      }
    } catch (e) {
      //TODO: Handle error
      console.log(e);
    }

    setIsSubscribing(false);
  };

  return (
    <Wrapper>
      <UserInfoContainer>
        {/*TODO: FETCH USER PROFILE IMAGE URL */}
        <CircleAvatar
          imgUrl={userData.profileImageURL ? userData.profileImageURL : ''}
          sizeScaling={1.5}
        />
        <UsernameContainer>
          <Text weight={700} size={1.8}>
            {userData?.userHandle}
          </Text>
          <Text opacity={0.7} size={1.2}>
            {/* PLACEHOLDER CONTENT */}
            {userData.numSubscribers} Subscribers | {userData.numPosts} Posts |{' '}
            {userData.numSeeds} Seeds
          </Text>
        </UsernameContainer>
        <UserBio>
          <Text size={1.2}>{userData.bio}</Text>
        </UserBio>
        <OpacityLoader loading={isSubscribing ? 1 : 0} defaultOpacity={1}>
          <StyledFancyButton sizeScaling={0.3} onClick={onSubscribeClick}>
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </StyledFancyButton>
        </OpacityLoader>
      </UserInfoContainer>
    </Wrapper>
  );
};
