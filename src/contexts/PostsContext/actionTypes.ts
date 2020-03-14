import { Post } from '../../types/Post';

export type Action =
  | SetPosts
  | AddPost
  | SetAddingPost
  | SetFetchingPosts
  | ResetPosts;

type SetPosts = {
  type: 'SET_POSTS';
  payload: Post[];
};

type ResetPosts = {
  type: 'RESET_POSTS';
};

type SetFetchingPosts = {
  type: 'SET_FETCHING_POSTS';
  payload: boolean;
};

// sets loading state for post being added to db
type SetAddingPost = {
  type: 'SET_ADDING_POST';
  payload: boolean;
};

type AddPost = {
  type: 'ADD_POST';
  payload: Post;
};
