import { State } from './context';
import { Action } from './actionTypes';

export const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        userHandle: action.payload.userHandle,
        userProfile: action.payload.userProfile
      };

    case 'SET_FETCHING_USER':
      return {
        ...state,
        fetchingUser: action.payload
      };

    default:
      throw new Error('Unhandled action type');
  }
};
