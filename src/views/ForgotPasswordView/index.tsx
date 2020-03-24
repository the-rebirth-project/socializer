import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { ForgotPasswordForm } from '../../components/specific/ForgotPasswordForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { Page } from '../../components/shared/Page';
import { Wrapper } from './styles';

export const ForgotPasswordView: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Wrapper>
        <SubHeading>Reset Password</SubHeading>
        <ForgotPasswordForm />
      </Wrapper>
    </Page>
  );
};
