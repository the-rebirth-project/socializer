import React from 'react';
import { Action } from './actionTypes';
import { Reply } from '../../types';

type Dispatch = (action: Action) => void;
export type State = {
  replies: Reply[];
  localReplies: Reply[];
  numReplies: number;
  fetchingReplies: boolean;
  // we only need to fetch it replies from db once. afterwards we cache it in state
  fetchedReplies: boolean;
  showReplies: boolean;
  postingReply: boolean; // for loading logic
};

export const initialState: State = {
  replies: [],
  localReplies: [],
  numReplies: 0,
  fetchingReplies: false,
  showReplies: false,
  fetchedReplies: false,
  postingReply: false
};

export const RepliesStateContext = React.createContext<State | undefined>(
  undefined
);
export const RepliesDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const useRepliesState = (): State => {
  const context = React.useContext(RepliesStateContext);
  if (context === undefined)
    throw new Error('Context must be used within a RepliesProvider');
  return context;
};

export const useRepliesDispatch = (): Dispatch => {
  const context = React.useContext(RepliesDispatchContext);
  if (context === undefined)
    throw new Error('Context must be used within a RepliesProvider');
  return context;
};
