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
  const userState = useUserState();
  const userProfileState = useUserProfileState();
  const userProfileDispatch = useUserProfileDispatch();
  const shouldLoad = userState.fetchingUser || userProfileState.fetchingData;
  const [hasError, setHasError] = useState(false);

  const fetchUser = async (): Promise<void> => {
    try {
      userProfileDispatch({ type: 'SET_FETCHING_DATA', payload: true });
      const userData = await db
        .collection('users')
        .doc(userHandle)
        .get();

      if (userData.exists) {
        const data = userData.data();
        const user: UserData = {
          userHandle: data?.userHandle,
          bio: data?.bio,
          numSeeds: data?.numSeeds,
          numSubscribers: data?.numSubscribers,
          numPosts: data?.numPosts,
          location: data?.location,
          profileImageURL: data?.profileImageURL
        };
        userProfileDispatch({ type: 'SET_USER_PROFILE', payload: user });

        if (userState.userHandle) {
          const subscriberDoc = await db
            .collection('users')
            .doc(userHandle)
            .collection('subscribers')
            .doc(userState.userHandle)
            .get();
          // current user is subscribed if the doc exists
          userProfileDispatch({
            type: 'SET_IS_SUBSCRIBED',
            payload: subscriberDoc.exists
          });
        }
      } else {
        setHasError(true);
      }
    } catch (err) {
      // Probably a network error
      // TODO: Handle error
      console.log(err);
    }

    userProfileDispatch({ type: 'SET_FETCHING_DATA', payload: false });
  };

  const memoizedFetchUser = useCallback(fetchUser, [userState.userHandle]);

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
