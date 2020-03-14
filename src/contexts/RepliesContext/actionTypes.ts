import { Reply } from '../../types';

export type Action =
  | SetReplies
  | AddReply
  | AddLocalReply
  | SetPostingReply
  | SetFetchingReplies
  | SetFetchedReplies
  | ResetLocalReplies
  | ShowReplies;

type SetReplies = {
  type: 'SET_REPLIES';
  payload: Reply[];
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

type SetPostingReply = {
  type: 'SET_POSTING_REPLY';
  payload: boolean;
};

type SetShowReplyForm = {
  type: 'SET_SHOW_REPLY_FORM';
  payload: boolean;
};
