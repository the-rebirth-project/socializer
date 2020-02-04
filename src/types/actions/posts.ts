import { Post } from '../Post';

export type PostsAction = SetPosts;

type SetPosts = {
  type: 'SET_POSTS';
  payload: Post[];
};
