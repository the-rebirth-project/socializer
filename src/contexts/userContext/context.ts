import React from 'react';

type Action = {
  type: 'SET_TOKEN';
  payload: { token: string };
};

type Dispatch = (action: Action) => void;
type State = { token: string };

export const initialState: State = {
  token: ''
};

export const UserStateContext = React.createContext<State | undefined>(
  undefined
);
export const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

export const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

export const useUserState = () => {
  const context = React.useContext(UserStateContext);
  if (context === undefined)
    throw new Error('Context must be used within a UserProvider');
};

export const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined)
    throw new Error('Context must be used within a UserProvider');
};
