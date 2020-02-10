import { Post } from '../../types/Post';

export type Action =
  | SetPosts
  | LikePost
  | UnlikePost
  | AddComment
  | SetPostingComment
  | AddPost
  | SetAddingPost;

type SetPosts = {
  type: 'SET_POSTS';
  payload: Post[];
};

type LikePost = {
  type: 'LIKE_POST';
  // payload is id of the post
  payload: {
    postId: string;
    userHandle: string;
  };
};

type UnlikePost = {
  type: 'UNLIKE_POST';
  payload: {
    postId: string;
    userHandle: string;
  };
};

type AddComment = {
  type: 'ADD_COMMENT';
  payload: {
    postId: string;
    userHandle: string;
    commentBody: string;
  };
};

// supply value to be set as payload
type SetPostingComment = {
  type: 'SET_POSTING_COMMENT';
  payload: {
    postId: string;
    value: boolean;
  };
};

// sets loading state for post being added to db
type SetAddingPost = {
  type: 'SET_ADDING_POST';
  payload: {
    postId: string;
    value: boolean;
  };
};

type AddPost = {
  type: 'ADD_POST';
  payload: Post;
};
