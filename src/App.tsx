import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createGlobalStyle } from 'styled-components';
import { useUserDispatch } from './contexts/UserContext';
import { Routes } from './Routes';
import { TopBar, TopBarBottomMargin } from './components/shared/TopBar';

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: inherit;
    margin: 0;
    -webkit-tap-highlight-color: inherit;
  }

  html, body {
    font-size: 10px;
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    background-color: ${props => props.theme.colors.background};
  }
`;

const App: React.FC = () => {
  const dispatch = useUserDispatch();

  // we only have to try getting the user if they're in any other location except register
  useEffect(() => {
    if (window.location.pathname !== '/register') {
      // SET USER
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            dispatch({ type: 'SET_FETCHING_USER', payload: true });
            const snap = await firebase
              .firestore()
              .collection('users')
              .where('userId', '==', user.uid)
              .limit(1)
              .get();
            const userDocData = snap.docs[0].data();

            dispatch({
              type: 'SET_USER',
              payload: {
                email: userDocData.email,
                userId: user.uid,
                userHandle: userDocData.userHandle,
                userProfile: userDocData.profileImageURL,
                bio: userDocData.bio,
                location: userDocData.location
              }
            });
            dispatch({ type: 'SET_FETCHING_USER', payload: false });
          } catch (err) {
            // TODO: Handle error
            console.log(err);
          }
        } else {
          // no need of doing this in the edit section. deletion logic handles the navigation
          if (window.location.pathname !== '/account/edit') navigate('/login');
        }
      });
    }
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <header style={{ marginBottom: `${TopBarBottomMargin}rem` }}>
        <TopBar />
      </header>
      <Routes />
    </div>
  );
};

export default App;
