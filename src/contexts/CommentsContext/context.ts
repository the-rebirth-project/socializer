import React from 'react';
import { Action } from './actionTypes';
import { Comment } from '../../types';

type Dispatch = (action: Action) => void;
export type State = {
  comments: Comment[];
  numComments: number;
  showReplies: boolean;
  postingComment: boolean;
};

export const initialState: State = {
  comments: [],
  numComments: 0,
  showReplies: false,
  postingComment: false
};

export const CommentsStateContext = React.createContext<State | undefined>(
  undefined
);
export const CommentsDispatchContext = React.createContext<
  Dispatch | undefined
>(undefined);

export const useCommentsState = (): State => {
  const context = React.useContext(CommentsStateContext);
  if (context === undefined)
    throw new Error('Context must be used within a CommentsProvider');

  return context;
};

export const useCommentsDispatch = (): Dispatch => {
  const context = React.useContext(CommentsDispatchContext);
  if (context === undefined)
    throw new Error('Context must be used within a CommentsProvider');

  return context;
};
