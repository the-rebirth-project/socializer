import React from 'react';
import { textInputReducer } from './reducers';
import {
  TextInputStateContext,
  TextInputDispatchContext,
  initialState
} from './context';

export const TextInputProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(textInputReducer, initialState);

  return (
    <TextInputStateContext.Provider value={state}>
      <TextInputDispatchContext.Provider value={dispatch}>
        {children}
      </TextInputDispatchContext.Provider>
    </TextInputStateContext.Provider>
  );
};
