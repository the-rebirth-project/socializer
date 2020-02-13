import React from 'react';
import { Action } from './actions';
import { CommentMode } from '../../types';

type Dispatch = (action: Action) => void;
export type State = {
  commentMode: CommentMode;
  postId: string; // we need the id of the post so that we can focus the correct text input
  // to figure out which comment to add the reply to
  commentId: string;
};

export const initialState: State = {
  commentMode: CommentMode.POST_COMMENT,
  postId: '',
  commentId: ''
};

export const TextInputStateContext = React.createContext<State | undefined>(
  undefined
);
export const TextInputDispatchContext = React.createContext<
  Dispatch | undefined
>(undefined);

export const useTextInputState = (): State => {
  const context = React.useContext(TextInputStateContext);

  if (context === undefined)
    throw new Error('Context must be within a TextInputProvider');
  return context;
};

export const useTextInputDispatch = (): Dispatch => {
  const context = React.useContext(TextInputDispatchContext);

  if (context === undefined)
    throw new Error('Context must be within a TextInputProvider');
  return context;
};
