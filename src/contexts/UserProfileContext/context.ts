import React from 'react';
import { Action } from './actionTypes';
import { UserData } from '../../types';

/* NOTE: This context handles state related to fetching the details of a user.
It should not be confused with UserContext nor with the profile image of a user */

type Dispatch = (action: Action) => void;

export interface State extends UserData {}

export const initialState: State = {
  userHandle: '',
  userProfileImg: '',
  bio: '',
  location: '',
  numConnects: 0,
  numPosts: 0,
  numSeeds: 0
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
