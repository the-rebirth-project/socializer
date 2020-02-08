import React from 'react';
import { Action } from './actions';
import { Post } from '../../types';

type Dispatch = (action: Action) => void;
export type State = {
  posts: Post[];
};

export const initialState = {
  posts: []
};

export const PostsStateContext = React.createContext<State | undefined>(
  undefined
);
export const PostsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const usePostsState: () => State = () => {
  const context = React.useContext(PostsStateContext);
  if (context === undefined)
    throw new Error('Context must be used within a PostsProvider');
  return context;
};

export const usePostsDispatch = () => {
  const context = React.useContext(PostsDispatchContext);
  if (context === undefined)
    throw new Error('Context must be used within a PostsProvider');
  return context;
};
