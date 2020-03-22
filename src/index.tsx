import React from 'react';
import ReactDOM from 'react-dom';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import firebase from 'firebase/app';
import { ThemeProvider } from 'styled-components';
import { UserContextProvider } from './contexts/UserContext';
import * as serviceWorker from './serviceWorker';
import { mainTheme } from './themes/mainTheme';
import { Routes } from './Routes';

const FBConfig = require('./config/index');
firebase.initializeApp(FBConfig);

const alertOptions = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.FADE,
  offset: '6rem'
};

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <UserContextProvider>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Routes />
      </AlertProvider>
    </UserContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
