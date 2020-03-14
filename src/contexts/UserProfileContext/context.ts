import React from 'react';
import { Action } from './actionTypes';
import { UserData } from '../../types';

/* NOTE: This context handles state related to fetching the details of a user.
It should not be confused with UserContext nor with the profile image of a user */

type Dispatch = (action: Action) => void;

export type State = {
  userData: UserData;
  fetchingData: boolean;
  isSubscribed: boolean;
};

export const initialState: State = {
  userData: {
    userHandle: '',
    profileImageURL: '',
    bio: '',
    location: '',
    numSubscribers: 0,
    numPosts: 0,
    numSeeds: 0
  },
  fetchingData: false,
  isSubscribed: false
};

export const UserProfileStateContext = React.createContext<State | undefined>(
  undefined
);
export const UserProfileDispatchContext = React.createContext<
  Dispatch | undefined
>(undefined);

export const useUserProfileState = (): State => {
  const context = React.useContext(UserProfileStateContext);
  if (context === undefined)
    throw new Error('Context must be used within a UserProfileProvider');
  return context;
};

export const useUserProfileDispatch = (): Dispatch => {
  const context = React.useContext(UserProfileDispatchContext);
  if (context === undefined)
    throw new Error('Context must be used within a UserProfileProvider');
  return context;
};
