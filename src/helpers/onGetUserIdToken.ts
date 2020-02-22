import firebase from 'firebase/app';
import 'firebase/auth';
import { navigate } from '@reach/router';

export const onGetUserIdToken = (
  requestCallback: (idToken: string) => Promise<void>
) => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      const idToken = await user.getIdToken();
      await requestCallback(idToken);
    } else {
      navigate('/login');
    }
  });
};
