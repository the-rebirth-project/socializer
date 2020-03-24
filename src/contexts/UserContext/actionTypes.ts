export type Action = SetUser | SetFetchingUser | ChangeProfilePhoto;

type SetUser = {
  type: 'SET_USER';
  payload: {
    email: string;
    userId: string;
    userHandle: string;
    userProfile: string;
    bio: string;
    location: string;
  };
};

type ChangeProfilePhoto = {
  type: 'CHANGE_PROFILE_PHOTO';
  /**
   * The payload contains the image URL of the new profile photo
   */
  payload: string;
};

type SetFetchingUser = {
  type: 'SET_FETCHING_USER';
  payload: boolean;
};

// ASYNC ACTIONS
