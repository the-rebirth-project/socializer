import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase/app';
import { UserContextProvider } from './contexts/UserContext';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './themes/mainTheme';

const FBConfig = require('./config/index');
firebase.initializeApp(FBConfig);

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
