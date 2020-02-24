import { Comment } from '../../types';

export type Action =
  | AddComment
  | SetPostingComment
  | SetPostingReply
  | SetComments
  | SetShowReplies;

type SetComments = {
  type: 'SET_COMMENTS';
  payload: Comment[];
};

type SetPostingComment = {
  type: 'SET_POSTING_COMMENT';
  payload: boolean;
};

type AddComment = {
  type: 'ADD_COMMENT';
  payload: Comment;
};

type SetShowReplies = {
  type: 'SET_SHOW_REPLIES';
  payload: boolean;
};

type SetPostingReply = {
  type: 'SET_POSTING_REPLY';
  payload: {
    commentId: string;
    value: boolean;
  };
};
