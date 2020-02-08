import { Post } from '../../types/Post';

export type Action = SetUser;

type SetUser = {
  type: 'SET_USER';
  payload: {
    userHandle: string;
    posts: Post[];
  };
};
