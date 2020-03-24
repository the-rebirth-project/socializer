import { UserData } from '../../types/UserData';

export type Action =
  | SetUserProfile
  | SetFetchingData
  | SetIsSubscribed
  | SetAuthorizedToEdit;

type SetUserProfile = {
  type: 'SET_USER_PROFILE';
  payload: UserData;
};

type SetFetchingData = {
  type: 'SET_FETCHING_DATA';
  payload: boolean;
};

type SetIsSubscribed = {
  type: 'SET_IS_SUBSCRIBED';
  payload: boolean;
};

type SetAuthorizedToEdit = {
  type: 'SET_AUTHORIZED_TO_EDIT';
  payload: boolean;
};
