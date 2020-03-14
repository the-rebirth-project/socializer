import React from 'react';
import { Router } from '@reach/router';
import { RedirectView } from './views/RedirectView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ForgotPasswordView } from './views/ForgotPasswordView';
import { HomeView } from './views/HomeView';
import { UserView } from './views/UserView';

export const Routes: React.FC = () => {
  return (
    <Router>
      <RedirectView path='/' />
      <HomeView path='/home' />
      <LoginView path='/login' />
      <RegisterView path='/register' />
      <ForgotPasswordView path='/forgot-password' />
      <UserView path='/users/:userHandle' />
    </Router>
  );
};
