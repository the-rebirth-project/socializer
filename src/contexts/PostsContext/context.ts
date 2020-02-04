import React from 'react';
import { PostsAction } from '../../types/actions';
import { Post } from '../../types';

type Dispatch = (action: PostsAction) => void;
type State = {
  posts: Post[];
};

export const initialState = {
  posts: []
};

export const postsReducer = (state: State, action: PostsAction) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      };
    default:
      throw new Error(`Unhandled action of type ${action.type}`);
  }
};

export const PostsStateContext = React.createContext<State | undefined>(
  undefined
);
export const PostsDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

// verifies if context is subscribed to inside of a provider
const verifyContext = (context: State | Dispatch | undefined) => {
  if (context === undefined)
    throw new Error('Context must be used within a PostsProvider');
};

export const usePostsState = () => {
  const context = React.useContext(PostsStateContext);
  verifyContext(context);
  return context;
};

export const usePostsDispatch = () => {
  const context = React.useContext(PostsDispatchContext);
  verifyContext(context);
  return context;
};
