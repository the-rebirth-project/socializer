import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { AuthError } from '../../../utils/AuthError';
import { FieldLabel } from '../../shared/FieldLabel';
import { TextInput } from '../../shared/TextInput';
import { CheckboxInput } from '../../shared/CheckboxInput';
import { FancyButton } from '../../shared/FancyButton';
import { Text } from '../../shared/Text';
import { LinkText } from '../../shared/LinkText';
import { TextLoader } from '../../shared/TextLoader';
import {
  FormFieldGrid,
  ErrorMessage,
  MetaTextContainer,
  CheckboxFieldGrid
} from '../../shared/FormStyles';
import { FormWrapper, ButtonContainer } from './styles';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export const RegisterForm: React.FC = () => {
  const db = firebase.firestore();
  const fbConfig = require('../../../config');

  const [signingUp, setSigningUp] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [verifEmailSent, setVerifEmailSent] = useState(false);

  const signUpUser = async (formValues: FormValues) => {
    try {
      const defaultPhotoUrl = `https://firebasestorage.googleapis.com/v0/b/${fbConfig.storageBucket}/o/no-img.png?alt=media`;

      // user already exists with the same userHandle
      const userDoc = await db.doc(`users/${formValues.username}`).get();
      if (userDoc.exists)
        throw new AuthError(
          'auth/username-already-taken',
          'Authentication Failed'
        );

      const credentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(formValues.email, formValues.password);

      credentials.user?.updateProfile({
        displayName: formValues.username,
        photoURL: defaultPhotoUrl
      });

      // send email verification link
      await credentials.user?.sendEmailVerification();

      const userDetails = {
        userHandle: formValues.username,
        email: credentials.user?.email,
        bio: `Hi! I'm a new socializer!`,
        location: 'Earth',
        website: '',
        numPosts: 0,
        numSeeds: 0,
        numConnects: 0,
        profileImageURL: defaultPhotoUrl,
        createdAt: new Date().toISOString(),
        userId: credentials.user?.uid
      };

      await db
        .collection('users')
        .doc(formValues.username)
        .set(userDetails);

      setVerifEmailSent(true);
    } catch (err) {
      throw new AuthError(err.code, 'Authentication failed');
    }
  };

  const onSubmit = async (values: FormValues) => {
    setSigningUp(true);
    // reset error
    setSubmitError('');
    try {
      await signUpUser(values);
      setSigningUp(false);
    } catch (err) {
      /**
       * - POSSIBLE ERRORS
       * auth/email-already-in-use
       * auth/invalid-email
       * auth/operation-not-allowed
       * auth/weak-password
       * auth/username-already-taken
       */

      switch (err.code) {
        case 'auth/email-already-in-use':
          setSubmitError('Email is already in use');
          break;
        case 'auth/username-already-taken':
          setSubmitError('Username is taken');
          break;
        case 'auth/invalid-email':
          setSubmitError('Email entered is invalid');
          break;
        case 'auth/operation-not-allowed':
          setSubmitError(
            'We goofed up on our end. Please wait until we fix things.'
          );
          break;
        case 'auth/weak-password':
          setSubmitError('Password is weak');
          break;
        case 'server/unavailable':
          setSubmitError('Server is currently unavailable');
          break;
        default:
          setSubmitError('An unexpected error has occured');
          break;
      }
      setSigningUp(false);
      return { [FORM_ERROR]: submitError };
    }
  };

  // these are in rem units
  const fieldLabelMargins = {
    left: 1,
    right: 0,
    bottom: 0,
    top: 0
  };

  const required = (value: any) => (value ? undefined : 'Required');
  const noWhitespace = (value: any) =>
    /\s/g.test(value) ? 'No spaces allowed' : undefined;
  const passwordValidator = (value: string) =>
    value.length > 8 ? undefined : 'Must be more than 8 characters';
  const emailValidator = (value: string) =>
    /\s/g.test(value) || !value.includes('@') ? 'Invalid email' : undefined;
  const minChar = (min: number) => (value: string) =>
    value.length >= min ? undefined : `Must be more than ${min - 1} characters`;
  const maxChar = (max: number) => (value: string) =>
    value.length <= max ? undefined : `Must be less than ${max - 1} characters`;
  const composeValidators = (...validators: any[]) => (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <FormWrapper onSubmit={handleSubmit}>
          <Field
            name='username'
            validate={composeValidators(
              required,
              noWhitespace,
              minChar(4),
              maxChar(20)
            )}
            render={({ input, meta }) => (
              <FormFieldGrid>
                <FieldLabel
                  margin={fieldLabelMargins}
                  hasError={meta.error && meta.touched}
                >
                  Username
                  {meta.error && meta.touched && (
                    <ErrorMessage> | {meta.error}</ErrorMessage>
                  )}
                </FieldLabel>
                <TextInput
                  {...input}
                  type='text'
                  autoComplete='off'
                  placeholder='Enter your username'
                  hasError={meta.error && meta.touched}
                  onKeyPress={e => {
                    if (e.which === 32) return false;
                  }}
                />
              </FormFieldGrid>
            )}
          />

          <Field
            name='email'
            validate={composeValidators(required, emailValidator)}
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
            validate={composeValidators(
              required,
              passwordValidator,
              noWhitespace
            )}
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
                  placeholder='Enter a password'
                  hasError={meta.error && meta.touched}
                />
              </FormFieldGrid>
            )}
          />

          <Field
            name='acceptedTerms'
            type='checkbox'
            render={({ input, meta }) => (
              <CheckboxFieldGrid>
                <CheckboxInput {...input} type='checkbox' />
                <FieldLabel margin={fieldLabelMargins}>
                  <Text size={1.2}>
                    Accept <LinkText to=''>Terms and Conditions</LinkText>
                  </Text>
                </FieldLabel>
              </CheckboxFieldGrid>
            )}
          />

          <MetaTextContainer>
            {verifEmailSent && !submitError && (
              <Text size={1.2}>Verification email sent</Text>
            )}
            <ErrorMessage>{submitError}</ErrorMessage>
          </MetaTextContainer>

          <ButtonContainer>
            <FancyButton onClick={handleSubmit}>
              {!signingUp && 'Sign Up'}{' '}
              <TextLoader loading={signingUp}>Authenticating...</TextLoader>
            </FancyButton>

            <Text size={1.2}>
              Already have an account? Click{' '}
              <LinkText to='/login'>here</LinkText> to sign in
            </Text>
          </ButtonContainer>
        </FormWrapper>
      )}
    />
  );
};
