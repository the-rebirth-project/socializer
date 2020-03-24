import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { RegisterForm } from '../../components/specific/RegisterForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { Page } from '../../components/shared/Page';
import { Wrapper } from './styles';

export const RegisterView: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Wrapper>
        <SubHeading>Register an account</SubHeading>
        <RegisterForm />
      </Wrapper>
    </Page>
  );
};
