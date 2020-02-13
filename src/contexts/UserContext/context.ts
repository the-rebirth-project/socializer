import React from 'react';
import { Action } from './actions';
import { Post } from '../../types';

// current user state

type Dispatch = (action: Action) => void;
export type State = {
  userHandle: string;
  userProfile: string;
  userPosts: Post[];
  fetchingUser: boolean;
};

/**
 * We access the current user's id token by using onAuthStateChanged
 */

export const initialState: State = {
  userHandle: '',
  userProfile: '',
  userPosts: [],
  fetchingUser: false
};

export const UserStateContext = React.createContext<State | undefined>(
  undefined
);
export const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined)
    throw new Error('Context must be used within a UserProvider');
  return context;
};

export const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined)
    throw new Error('Context must be used within a UserProvider');
  return context;
};
