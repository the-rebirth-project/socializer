import React from 'react';
import { Router } from '@reach/router';
import { RedirectView } from './views/RedirectView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { HomeView } from './views/HomeView';
import { UserView } from './views/UserView';
import { EditProfileView } from './views/EditProfileView';

export const Routes: React.FC = () => {
  return (
    <Router>
      <RedirectView path='/' />
      <HomeView path='/home' />
      <LoginView path='/login' />
      <LoginView path='/reauthenticate' />
      <RegisterView path='/register' />
      <ForgotPasswordView path='/forgot-password' />
      <UserView path='/users/:userHandle' />
      <EditProfileView path='/account/edit' />
    </Router>
  );
};
