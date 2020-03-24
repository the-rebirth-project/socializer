import { State } from './context';
import { Action } from './actionTypes';

export const repliesReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_REPLIES':
      return {
        ...state,
        replies: action.payload
      };

    case 'SET_FETCHED_REPLIES':
      return {
        ...state,
        fetchedReplies: action.payload
      };

    case 'SET_NUM_REPLIES':
      return {
        ...state,
        numReplies: action.payload
      };

    case 'INCREMENT_NUM_REPLIES':
      return {
        ...state,
        numReplies: state.numReplies + 1
      };

    case 'DECREMENT_NUM_REPLIES':
      return {
        ...state,
        numReplies: state.numReplies - 1
      };

    case 'SHOW_REPLIES':
      return {
        ...state,
        showReplies: action.payload
      };

    case 'RESET_LOCAL_REPLIES':
      return {
        ...state,
        localReplies: []
      };

    case 'SET_FETCHING_REPLIES':
      return {
        ...state,
        fetchingReplies: action.payload
      };

    case 'ADD_REPLY':
      return {
        ...state,
        replies: [action.payload, ...state.replies]
      };

    case 'ADD_LOCAL_REPLY':
      return {
        ...state,
        localReplies: [action.payload, ...state.localReplies]
      };

    case 'SET_POSTING_REPLY':
      return {
        ...state,
        postingReply: action.payload
      };

    default:
      throw new Error('Unhandled action type in RepliesContext');
  }
};
