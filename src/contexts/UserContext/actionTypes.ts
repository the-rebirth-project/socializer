export type Action = SetUser | SetFetchingUser;

type SetUser = {
  type: 'SET_USER';
  payload: {
    userHandle: string;
    userProfile: string;
  };
};

type SetFetchingUser = {
  type: 'SET_FETCHING_USER';
  payload: boolean;
};

// ASYNC ACTIONS
