import React, { useState, useCallback, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import { useUserState } from '../../../contexts/UserContext';
import {
  useUserProfileState,
  useUserProfileDispatch
} from '../../../contexts/UserProfileContext';
import { UserInfoCard } from '../UserInfoCard';
import { UserPosts } from '../UserPosts';
import { useMounted } from '../../../hooks/useMounted';
import { Text } from '../../shared/Text';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { SubHeading } from '../../shared/SubHeading';
import { Center } from '../../shared/Center';
import { UserData } from '../../../types';
import { Wrapper } from './styles';

type UserInfoProps = {
  userHandle: string | undefined;
};
export const UserInfo: React.FC<UserInfoProps> = ({ userHandle }) => {
  const db = firebase.firestore();
  const isMounted = useMounted();
  const userState = useUserState();
  const userProfileState = useUserProfileState();
  const userProfileDispatch = useUserProfileDispatch();
  const shouldLoad = userState.fetchingUser || userProfileState.fetchingData;
  const [hasError, setHasError] = useState(false);

  const fetchUser = async (): Promise<void> => {
    try {
      isMounted.current &&
        userProfileDispatch({ type: 'SET_FETCHING_DATA', payload: true });
      const snap = await db
        .collection('users')
        .where('userHandle', '==', userHandle)
        .get();
      const userData = snap.docs[0];

      if (userData !== undefined && userData.exists) {
        const data = userData.data();
        const user: UserData = {
          userHandle: data?.userHandle,
          userId: data?.userId,
          bio: data?.bio,
          numSeeds: data?.numSeeds,
          // decrement numSubscribers to offset the fact that you automatically sub to yourself
          numSubscribers: data?.numSubscribers - 1,
          numPosts: data?.numPosts,
          location: data?.location,
          profileImageURL: data?.profileImageURL
        };
        isMounted.current &&
          userProfileDispatch({ type: 'SET_USER_PROFILE', payload: user });

        if (userState.userHandle) {
          // check to see if user is authorized to edit profile info
          if (userState.userHandle === user.userHandle)
            isMounted.current &&
              userProfileDispatch({
                type: 'SET_AUTHORIZED_TO_EDIT',
                payload: true
              });

          const subscriberDoc = await db
            .collection('users')
            .doc(user.userId)
            .collection('subscribers')
            .doc(userState.userId)
            .get();
          // current user is subscribed if the doc exists
          isMounted.current &&
            userProfileDispatch({
              type: 'SET_IS_SUBSCRIBED',
              payload: subscriberDoc.exists
            });
        }
      } else {
        isMounted.current && setHasError(true);
      }
    } catch (err) {
      // Probably a network error
      // TODO: Handle error
      console.log(err);
    }

    isMounted.current &&
      userProfileDispatch({ type: 'SET_FETCHING_DATA', payload: false });
  };

  const memoizedFetchUser = useCallback(fetchUser, [
    userState.userHandle,
    isMounted
  ]);

  useEffect(() => {
    memoizedFetchUser();
  }, [memoizedFetchUser]);

  return (
    <Wrapper>
      <LoadingSpinner loading={shouldLoad ? 1 : 0} centerSpinner>
        {hasError && (
          <Center>
            <Text size={2}>
              Oops! Couldn't find the user you're looking for.
            </Text>
          </Center>
        )}
        {!hasError && (
          <>
            <UserInfoCard />
            {userProfileState.userData.numPosts > 0 ? (
              <SubHeading>Posts</SubHeading>
            ) : (
              <Text size={1.3}>This user hasn't posted anything yet.</Text>
            )}

            <UserPosts />
          </>
        )}
      </LoadingSpinner>
    </Wrapper>
  );
};
