import { Post } from '../../types/Post';

export type Action = SetUser | SetFetchingUser;

type SetUser = {
  type: 'SET_USER';
  payload: {
    userHandle: string;
    userProfile: string;
    posts: Post[];
  };
};

type SetFetchingUser = {
  type: 'SET_FETCHING_USER';
  payload: boolean;
};

// ASYNC ACTIONS
