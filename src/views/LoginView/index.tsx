import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LoginForm } from '../../components/specific/LoginForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { Wrapper, GlobalBackground } from '../RegisterView/styles';

export const LoginView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <GlobalBackground />
      <Wrapper>
        <SubHeading>Enter Credentials</SubHeading>
        <LoginForm />
      </Wrapper>
    </>
  );
};
