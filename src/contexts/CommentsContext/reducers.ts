import { State } from './context';
import { Action } from './actionTypes';

export const commentsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };

    case 'SET_COMMENTS':
      return {
        ...state,
        comments: [...state.comments, ...action.payload]
      };

    case 'SET_POSTING_COMMENT':
      return {
        ...state,
        postingComments: action.payload
      };

    case 'SET_SHOW_REPLIES':
      return {
        ...state,
        showReplies: action.payload
      };

    default:
      throw new Error('Unhandled action in CommentsContext');
  }
};
