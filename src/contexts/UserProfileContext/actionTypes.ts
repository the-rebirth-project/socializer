import { UserData } from '../../types/UserData';

export type Action = SetUserProfile;

type SetUserProfile = {
  type: 'SET_USER_PROFILE';
  payload: UserData;
};
