import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import { API_URL } from '../../constants/apiUrl';
import { Dispatch } from 'react';
import { Post } from '../../types/Post';
import { navigate } from '@reach/router';

export type Action = SetUser | SetFetchingUser;

type SetUser = {
  type: 'SET_USER';
  payload: {
    userHandle: string;
    userProfile: string;
    posts: Post[];
  };
};

type SetFetchingUser = {
  type: 'SET_FETCHING_USER';
  payload: boolean;
};

// ASYNC ACTIONS

export const setUser = async (dispatch: Dispatch<Action>) => {
  dispatch({ type: 'SET_FETCHING_USER', payload: true });
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      try {
        const idToken = await user.getIdToken();
        const res = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });

        dispatch({
          type: 'SET_USER',
          payload: {
            userHandle: res.data.userHandle,
            userProfile: res.data.profileImageUrl,
            posts: res.data.posts
          }
        });
      } catch (err) {
        // TODO: Handle error
        console.log(err);
      }
    } else {
      navigate('/login');
    }
  });
  dispatch({ type: 'SET_FETCHING_USER', payload: false });
};
