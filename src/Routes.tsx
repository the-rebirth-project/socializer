import React from 'react';
import { Router } from '@reach/router';
import '@types/reach__router';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { HomeView } from './views/HomeView';

export const Routes: React.FC = () => {
  return (
    <Router>
      <HomeView path='/' />
      <LoginView path='/login' />
      <RegisterView path='/register' />
    </Router>
  );
};
