import { State } from './context';
import { Action } from './actionTypes';

export const userProfileReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER_PROFILE':
      return {
        ...state,
        ...action.payload
      };

    default:
      throw new Error('Unhandled action type in userProfileReducer');
  }
};
