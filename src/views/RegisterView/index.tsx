import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { RegisterForm } from '../../components/specific/RegisterForm';
import { SubHeading } from '../../components/shared/SubHeading';
import { FancyButton } from '../../components/shared/FancyButton';
import { SmallText } from '../../components/shared/SmallText';
import { LinkText } from '../../components/shared/LinkText';
import { Wrapper, ButtonContainer, GlobalBackground } from './styles';

export const RegisterView: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <GlobalBackground />
      <Wrapper>
        <SubHeading>Register an account</SubHeading>
        <RegisterForm />
        <ButtonContainer>
          <FancyButton>Sign Up</FancyButton>
          <SmallText>
            Already have an account? Click <LinkText to='/login'>here</LinkText>{' '}
            to sign in
          </SmallText>
        </ButtonContainer>
      </Wrapper>
    </>
  );
};
