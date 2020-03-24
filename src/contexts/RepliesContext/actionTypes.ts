import { Reply } from '../../types';

export type Action =
  | SetReplies
  | AddReply
  | AddLocalReply
  | SetPostingReply
  | SetNumReplies
  | SetFetchingReplies
  | IncrementNumReplies
  | DecrementNumReplies
  | SetFetchedReplies
  | ResetLocalReplies
  | ShowReplies;

type SetReplies = {
  type: 'SET_REPLIES';
  payload: any[];
};

type SetNumReplies = {
  type: 'SET_NUM_REPLIES';
  payload: number;
};

type IncrementNumReplies = {
  type: 'INCREMENT_NUM_REPLIES';
};

type DecrementNumReplies = {
  type: 'DECREMENT_NUM_REPLIES';
};

type SetFetchedReplies = {
  type: 'SET_FETCHED_REPLIES';
  payload: boolean;
};

type SetFetchingReplies = {
  type: 'SET_FETCHING_REPLIES';
  payload: boolean;
};

type ShowReplies = {
  type: 'SHOW_REPLIES';
  payload: boolean;
};

type AddReply = {
  type: 'ADD_REPLY';
  payload: Reply;
};

type AddLocalReply = {
  type: 'ADD_LOCAL_REPLY';
  payload: Reply;
};

type ResetLocalReplies = {
  type: 'RESET_LOCAL_REPLIES';
};

type SetPostingReply = {
  type: 'SET_POSTING_REPLY';
  payload: boolean;
};
