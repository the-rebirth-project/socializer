import React, { useReducer } from 'react';
import { commentsReducer } from './reducers';
import {
  initialState,
  CommentsStateContext,
  CommentsDispatchContext
} from './context';

export const CommentsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(commentsReducer, initialState);

  return (
    <CommentsStateContext.Provider value={state}>
      <CommentsDispatchContext.Provider value={dispatch}>
        {children}
      </CommentsDispatchContext.Provider>
    </CommentsStateContext.Provider>
  );
};
