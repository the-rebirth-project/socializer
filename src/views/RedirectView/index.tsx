import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { navigate, RouteComponentProps } from '@reach/router';

export const RedirectView: React.FC<RouteComponentProps> = () => {
  const redirect = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    });
  };
  useEffect(redirect, []);

  return <div></div>;
};
