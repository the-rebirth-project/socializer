import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router, WindowLocation, navigate } from '@reach/router';
import { animated, useTransition } from 'react-spring';
import { useUserDispatch } from './contexts/UserContext';
import { RedirectView } from './views/RedirectView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ExploreView } from './views/ExploreView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { HomeView } from './views/HomeView';
import { UserView } from './views/UserView';
import { NotificationsView } from './views/NotificationsView';
import { EditProfileView } from './views/EditProfileView';
import { TopBar } from './components/shared/TopBar';
import { BottomBar } from './components/shared/BottomBar';

type RoutesProps = {
  location: WindowLocation;
};
export const Routes: React.FC<RoutesProps> = ({ location }) => {
  const dispatch = useUserDispatch();
  const pathname = location.pathname;
  const isForbiddenPath =
    pathname !== '/register' &&
    pathname !== '/account/edit' &&
    pathname !== '/reauthenticate' &&
    pathname !== '/forgot-password';

  useEffect(() => {
    // SET USER
    firebase.auth().onAuthStateChanged(async (user) => {
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
              location: userDocData.location,
            },
          });
          dispatch({ type: 'SET_FETCHING_USER', payload: false });
        } catch (err) {
          // TODO: Handle error
          console.log(err);
        }
      } else {
        // no need of doing this in the edit section. deletion logic handles the navigation
        isForbiddenPath && navigate('/login');
      }
    });
  }, [dispatch, isForbiddenPath]);

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      <header>
        <TopBar />
      </header>
      {location.pathname !== '/login' && location.pathname !== '/register' && (
        <BottomBar />
      )}

      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <Router location={item}>
            <RedirectView path='/' />
            <HomeView path='home' />
            <LoginView path='login' />
            <LoginView path='reauthenticate' />
            <RegisterView path='register' />
            <ExploreView path='explore' />
            <ForgotPasswordView path='forgot-password' />
            <UserView path='users/:userHandle' />
            <EditProfileView path='account/edit' />
            <NotificationsView path='notifications' />
          </Router>
        </animated.div>
      ))}
    </>
  );
};
