import React from 'react';
import {
  initialState,
  RepliesStateContext,
  RepliesDispatchContext
} from './context';
import { repliesReducer } from './reducers';

export const RepliesProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(repliesReducer, initialState);

  return (
    <RepliesStateContext.Provider value={state}>
      <RepliesDispatchContext.Provider value={dispatch}>
        {children}
      </RepliesDispatchContext.Provider>
    </RepliesStateContext.Provider>
  );
};
