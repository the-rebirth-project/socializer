import { Comment } from '../../types';

export type Action = AddComment | SetPostingComment | SetComments;

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
