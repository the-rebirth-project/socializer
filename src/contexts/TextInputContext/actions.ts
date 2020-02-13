import { CommentMode } from '../../types';

export type Action = SetCommentMode | SetPostId | SetCommentId;

type SetCommentMode = {
  type: 'SET_COMMENT_MODE';
  payload: CommentMode;
};

// we need both these set actions so that we can focus the correct text input element on the required PostItem
type SetPostId = {
  type: 'SET_POST_ID';
  payload: string;
};

type SetCommentId = {
  type: 'SET_COMMENT_ID';
  // payload is comment id
  payload: string;
};
