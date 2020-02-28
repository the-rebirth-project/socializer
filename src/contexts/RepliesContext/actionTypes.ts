import { Reply } from '../../types';

export type Action =
  | SetReplies
  | AddReply
  | AddLocalReply
  | SetPostingReply
  | SetShowReplyForm;

type SetReplies = {
  type: 'SET_REPLIES';
  payload: Reply[];
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
