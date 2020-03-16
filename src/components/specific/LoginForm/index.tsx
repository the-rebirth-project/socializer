import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useAlert } from 'react-alert';
import { navigate } from '@reach/router';
import { Form, Field } from 'react-final-form';
import { useUserState } from '../../../contexts/UserContext';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
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
  MetaTextContainer,
  CheckboxFieldGrid
} from '../../shared/FormStyles';
import { TextLoader } from '../../shared/TextLoader';
import { CustomError } from '../../../utils/CustomError';
import { required } from '../../../utils/formValidators';

// TODO: Refactor LoginForm and RegisterForm into a single generic form component

type Values = {
  email: string;
  password: string;
};

type LoginFormProps = {
  reauthenticate?: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({ reauthenticate }) => {
  const [signingIn, setSigningIn] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [stayLoggedIn, setStayLoggedIn] = useState(true);
  const userState = useUserState();
  const alert = useAlert();
  const initialValues: Values = reauthenticate
    ? {
        email: userState.email,
        password: ''
      }
    : { email: '', password: '' };

  const signInUser = async (values: Values) => {
    try {
      if (!stayLoggedIn) {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      }
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);

      // if email is not verified, throw error and resend verification email
      if (!userCredentials.user?.emailVerified) {
        await userCredentials.user?.sendEmailVerification();
        await firebase.auth().signOut();
        throw new CustomError(
          'auth/email-not-verified',
          'Authentication failed'
        );
      }
    } catch (err) {
      throw new CustomError(err.code, 'Authentication failed');
    }
  };

  const reauthenticateUser = async (values: Values) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      values.email,
      values.password
    );

    try {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password);

      await userCredentials.user?.reauthenticateWithCredential(credential);
    } catch (err) {
      throw new CustomError(err.code, 'Reauthentication failed');
    }
  };

  const onSubmit = async (values: Values) => {
    setSubmitError('');
    setSigningIn(true);
    try {
      if (reauthenticate) {
        await reauthenticateUser(values);
        alert.success('Successfully reauthenticated');
        navigate('/account/edit');
      } else {
        await signInUser(values);
        navigate('/home');
      }
    } catch (err) {
      /**
       * - POSSIBLE ERRORS:
       * auth/invalid-email
       * auth/user-disabled
       * auth/wrong-password
       * auth/user-not-found
       * auth/email-not-verified
       * server/unavailable
       */
      alert.error('Authentication failed');

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
        case 'auth/email-not-verified':
          setSubmitError('Email not verified. Please check your inbox.');
          break;
        case 'auth/user-mismatch':
          setSubmitError('User does not correspond to signed in user');
          break;
        case 'server/unavailable':
          setSubmitError('Server is currently unavailable');
          break;
        default:
          setSubmitError('An unexpected error has occured');
          break;
      }
    }

    setSigningIn(false);
  };

  // Sign out user just in case they're signed in
  useEffect(() => {
    firebase.auth().signOut();
  }, []);

  // these are in rem units
  const fieldLabelMargins = {
    left: 1,
    right: 0,
    bottom: 0,
    top: 0
  };

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
            type='checkbox'
            render={({ input, meta }) => (
              <CheckboxFieldGrid>
                <CheckboxInput
                  {...input}
                  type='checkbox'
                  checked={stayLoggedIn}
                  onClick={() => setStayLoggedIn(!stayLoggedIn)}
                />
                <FieldLabel margin={fieldLabelMargins}>
                  <SmallText>Stay logged in</SmallText>
                </FieldLabel>
              </CheckboxFieldGrid>
            )}
          />

          <MetaTextContainer>
            <ErrorMessage>{submitError}</ErrorMessage>
          </MetaTextContainer>

          <ButtonContainer>
            <FancyButton onClick={handleSubmit}>
              {!signingIn && 'Sign In'}{' '}
              <TextLoader loading={signingIn}>Authenticating...</TextLoader>
            </FancyButton>
            <SmallText>
              Don't have an account? Click{' '}
              <LinkText to='/register'>here</LinkText> to sign up{' '}
              <LinkText to='/forgot-password'>Forgot Password?</LinkText>
            </SmallText>
          </ButtonContainer>
        </FormWrapper>
      )}
    />
  );
};
