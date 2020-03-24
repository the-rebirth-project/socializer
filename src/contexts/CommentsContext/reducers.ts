import { State } from './context';
import { Action } from './actionTypes';

export const commentsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload]
      };

    case 'SET_NUM_COMMENTS':
      return {
        ...state,
        numComments: action.payload
      };

    case 'INCREMENT_NUM_COMMENTS':
      return {
        ...state,
        numComments: state.numComments + 1
      };

    case 'DECREMENT_NUM_COMMENTS':
      return {
        ...state,
        numComments: state.numComments - 1
      };

    case 'SET_COMMENTS':
      return {
        ...state,
        comments: [...state.comments, ...action.payload]
      };

    case 'SET_POSTING_COMMENT':
      return {
        ...state,
        postingComment: action.payload
      };

    default:
      throw new Error('Unhandled action in CommentsContext');
  }
};
