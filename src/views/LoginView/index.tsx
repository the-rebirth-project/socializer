import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { LoginForm } from '../../components/specific/LoginForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { FancyButton } from '../../components/shared/FancyButton';
import { SmallText } from '../../components/shared/SmallText';
import { LinkText } from '../../components/shared/LinkText';
import { Wrapper, ButtonContainer } from '../RegisterView/styles';

export const LoginView: React.FC<RouteComponentProps> = () => {
  return (
    <Wrapper>
      <SubHeading>Enter Credentials</SubHeading>
      <LoginForm />
      <ButtonContainer>
        <FancyButton>Sign In</FancyButton>
        <SmallText>
          Don't have an account? Click <LinkText to='/register'>here</LinkText>{' '}
          to sign up
        </SmallText>
      </ButtonContainer>
    </Wrapper>
  );
};
