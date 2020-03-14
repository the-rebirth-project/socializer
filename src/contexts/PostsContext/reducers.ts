import { State } from './context';
import { Action } from './actionTypes';

export const postsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload]
      };

    case 'RESET_POSTS':
      return {
        ...state,
        posts: []
      };

    case 'ADD_POST':
      const posts = state.posts;
      posts.unshift(action.payload);

      return {
        ...state,
        posts: posts
      };

    case 'SET_FETCHING_POSTS':
      return {
        ...state,
        fetchingPosts: action.payload
      };

    case 'SET_ADDING_POST':
      return {
        ...state,
        addingPost: action.payload
      };

    default:
      throw new Error(`Unhandled action in PostsContext`);
  }
};
