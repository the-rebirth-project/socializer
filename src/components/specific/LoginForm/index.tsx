import React, { useState } from 'react';
import firebase from 'firebase';
import { navigate } from '@reach/router';
import { AuthError } from '../../../helpers/AuthError';
import { Form, Field } from 'react-final-form';
import { FieldLabel } from '../../shared/FieldLabel';
import { TextInput } from '../../shared/TextInput';
import { FancyButton } from '../../shared/FancyButton';
import { SmallText } from '../../shared/SmallText';
import { LinkText } from '../../shared/LinkText';
import { CheckboxInput } from '../../shared/CheckboxInput';
import { FormWrapper, ButtonContainer } from './styles';
import {
  FormFieldGrid,
  ErrorMessage,
  SubmitErrorContainer,
  CheckboxFieldGrid
} from '../RegisterForm/styles';
import { TextLoader } from '../../shared/TextLoader';

// TODO: Refactor LoginForm and RegisterForm into a single generic form component

type Values = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const signInUser = async (values: Values) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);
    } catch (err) {
      console.log(err);
      throw new AuthError(err.code, 'Authentication failed');
    }
  };

  const onSubmit = async (values: Values) => {
    setSigningIn(true);
    setSubmitError('');
    try {
      await signInUser(values);
      setSigningIn(false);
      setSubmitError('');
      // do redirects here
      navigate('/home');
    } catch (err) {
      /**
       * - POSSIBLE ERRORS:
       * auth/invalid-email
       * auth/user-disabled
       * auth/wrong-password
       * auth/user-not-found
       * server/unavailable
       */

      switch (err.code) {
        case 'auth/invalid-email':
          setSubmitError('Invalid email');
          break;
        case 'auth/user-disabled':
          setSubmitError('Account is disabled');
          break;
        case 'auth/wrong-password':
          setSubmitError('Invalid password');
          break;
        case 'auth/user-not-found':
          setSubmitError('User not found');
          break;
        case 'server/unavailable':
          setSubmitError('Server is currently unavailable');
          break;
        default:
          setSubmitError('An unexpected error has occured');
          break;
      }

      setSigningIn(false);
    }
  };

  // these are in rem units
  const fieldLabelMargins = {
    left: 1,
    right: 0,
    bottom: 0,
    top: 0
  };

  const required = (value: string) => (value ? undefined : 'Required');

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <FormWrapper onSubmit={handleSubmit}>
          <Field
            name='email'
            validate={required}
            render={({ input, meta }) => (
              <FormFieldGrid>
                <FieldLabel
                  margin={fieldLabelMargins}
                  hasError={meta.error && meta.touched}
                >
                  Email
                  {meta.error && meta.touched && (
                    <ErrorMessage> | {meta.error}</ErrorMessage>
                  )}
                </FieldLabel>
                <TextInput
                  {...input}
                  type='email'
                  autoComplete='off'
                  placeholder='Enter your email'
                  hasError={meta.error && meta.touched}
                />
              </FormFieldGrid>
            )}
          />

          <Field
            name='password'
            validate={required}
            render={({ input, meta }) => (
              <FormFieldGrid>
                <FieldLabel
                  margin={fieldLabelMargins}
                  hasError={meta.error && meta.touched}
                >
                  Password
                  {meta.error && meta.touched && (
                    <ErrorMessage> | {meta.error}</ErrorMessage>
                  )}
                </FieldLabel>
                <TextInput
                  {...input}
                  type='password'
                  autoComplete='off'
                  placeholder='Enter your password'
                  hasError={meta.error && meta.touched}
                />
              </FormFieldGrid>
            )}
          />

          <Field
            name='stayLoggedIn'
            render={({ input, meta }) => (
              <CheckboxFieldGrid>
                <CheckboxInput {...input} type='checkbox' />
                <FieldLabel margin={fieldLabelMargins}>
                  <SmallText>Stay logged in</SmallText>
                </FieldLabel>
              </CheckboxFieldGrid>
            )}
          />

          <SubmitErrorContainer>
            <ErrorMessage>{submitError}</ErrorMessage>
          </SubmitErrorContainer>

          <ButtonContainer>
            <FancyButton>
              {!signingIn && 'Sign In'}{' '}
              <TextLoader loading={signingIn}>Authenticating...</TextLoader>
            </FancyButton>
            <SmallText>
              Don't have an account? Click{' '}
              <LinkText to='/register'>here</LinkText> to sign up
            </SmallText>
          </ButtonContainer>
        </FormWrapper>
      )}
    />
  );
};
