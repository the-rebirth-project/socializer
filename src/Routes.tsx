import React from 'react';
import { Router } from '@reach/router';
import { App } from './App';
import { RedirectView } from './views/RedirectView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ExploreView } from './views/ExploreView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { HomeView } from './views/HomeView';
import { UserView } from './views/UserView';
import { NotificationsView } from './views/NotificationsView';
import { EditProfileView } from './views/EditProfileView';

export const Routes: React.FC = () => {
  return (
    <Router>
      <App path='/'>
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
      </App>
    </Router>
  );
};
