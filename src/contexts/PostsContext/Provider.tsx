import React from 'react';
import {
  PostsStateContext,
  PostsDispatchContext,
  postsReducer,
  initialState
} from './context';

export const PostsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(postsReducer, initialState);

  return (
    <PostsStateContext.Provider value={state}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsStateContext.Provider>
  );
};
