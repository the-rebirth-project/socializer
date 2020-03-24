import { State } from './context';
import { Action } from './actionTypes';

export const userProfileReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return {
        ...state,
        userData: action.payload
      };

    case 'SET_FETCHING_DATA':
      return {
        ...state,
        fetchingData: action.payload
      };

    case 'SET_IS_SUBSCRIBED':
      return {
        ...state,
        isSubscribed: action.payload
      };

    case 'SET_AUTHORIZED_TO_EDIT':
      return {
        ...state,
        authorizedToEdit: action.payload
      };

    default:
      throw new Error('Unhandled action type in UserProfileProvider');
  }
};
