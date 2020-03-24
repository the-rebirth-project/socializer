import { Comment } from '../../types';

export type Action =
  | AddComment
  | SetPostingComment
  | SetComments
  | SetNumComments
  | IncrementNumComments
  | DecrementNumComments;

type SetComments = {
  type: 'SET_COMMENTS';
  payload: Comment[];
};

type SetNumComments = {
  type: 'SET_NUM_COMMENTS';
  payload: number;
};

type SetPostingComment = {
  type: 'SET_POSTING_COMMENT';
  payload: boolean;
};

type AddComment = {
  type: 'ADD_COMMENT';
  payload: Comment;
};
