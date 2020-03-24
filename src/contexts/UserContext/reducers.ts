import { State } from './context';
import { Action } from './actionTypes';

export const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        email: action.payload.email,
        userId: action.payload.userId,
        userHandle: action.payload.userHandle,
        userProfile: action.payload.userProfile,
        bio: action.payload.bio,
        location: action.payload.location
      };

    case 'CHANGE_PROFILE_PHOTO':
      return {
        ...state,
        userProfile: action.payload
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
