import { State } from './context';
import { Action } from './actionTypes';

export const repliesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_REPLIES':
      return {
        ...state,
        replies: [...state.replies, ...action.payload]
      };

    case 'ADD_REPLY':
      return {
        ...state,
        replies: [...state.replies, action.payload]
      };

    case 'ADD_LOCAL_REPLY':
      return {
        ...state,
        localReplies: [...state.localReplies, action.payload]
      };

    case 'SET_POSTING_REPLY':
      return {
        ...state,
        postingReply: action.payload
      };

    case 'SET_SHOW_REPLY_FORM':
      return {
        ...state,
        showReplyForm: action.payload
      }
    
    default:
      throw new Error('Unhandled action type in RepliesContext');
  }
};
