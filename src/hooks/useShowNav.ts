import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const useShowNav = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) setShow(true);
      else setShow(false);
    });
  });

  return show;
};
