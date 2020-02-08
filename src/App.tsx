import React, { useEffect } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { createGlobalStyle } from 'styled-components';
import { useUserDispatch } from './contexts/UserContext';
import { API_URL } from './constants/apiUrl';
import { Routes } from './Routes';

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
    margin: 0;
  }

  html, body {
    font-size: 10px;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
  }
`;

const App: React.FC = () => {
  const dispatch = useUserDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const idToken = await user.getIdToken();
        const res = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        });
        console.log(res.data);
        dispatch({
          type: 'SET_USER',
          payload: {
            userHandle: res.data.userHandle,
            posts: res.data.posts
          }
        });
      }
    });
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  );
};

export default App;
