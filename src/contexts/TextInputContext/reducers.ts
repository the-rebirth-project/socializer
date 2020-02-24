import { State } from './context';
import { Action } from './actionTypes';

export const textInputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_COMMENT_MODE':
      return {
        ...state,
        commentMode: action.payload
      };

    case 'SET_POST_ID':
      return {
        ...state,
        postId: action.payload
      };

    case 'SET_COMMENT_ID':
      return {
        ...state,
        commentId: action.payload
      };

    default:
      throw new Error('Unhandled action in TextInputContext');
  }
};
