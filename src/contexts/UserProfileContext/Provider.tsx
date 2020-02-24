import React, { useReducer } from 'react';
import {
  initialState,
  UserProfileStateContext,
  UserProfileDispatchContext
} from './context';
import { userProfileReducer } from './reducers';

export const UserProfileProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userProfileReducer, initialState);

  return (
    <UserProfileStateContext.Provider value={state}>
      <UserProfileDispatchContext.Provider value={dispatch}>
        {children}
      </UserProfileDispatchContext.Provider>
    </UserProfileStateContext.Provider>
  );
};
