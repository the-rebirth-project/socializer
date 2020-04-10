import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LoginForm } from '../../components/specific/LoginForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { Page } from '../../components/shared/Page';
import { Wrapper } from '../RegisterView/styles';

export const LoginView: React.FC<RouteComponentProps> = ({ path }) => {
  return (
    <Page>
      <Wrapper>
        {path === 'login' ? (
          <>
            <SubHeading>Sign In</SubHeading>
            <LoginForm />
          </>
        ) : (
          <>
            <SubHeading>Reauthenticate</SubHeading>
            <LoginForm reauthenticate />
          </>
        )}
      </Wrapper>
    </Page>
  );
};
