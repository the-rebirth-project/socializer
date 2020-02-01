import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { RegisterForm } from '../../components/specific/RegisterForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { Wrapper, GlobalBackground } from './styles';

export const RegisterView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <GlobalBackground />
      <Wrapper>
        <SubHeading>Register an account</SubHeading>
        <RegisterForm />
      </Wrapper>
    </>
  );
};
