import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import axios from 'axios';
import { FieldLabel } from '../../shared/FieldLabel';
import { TextInput } from '../../shared/TextInput';
import { CheckboxInput } from '../../shared/CheckboxInput';
import { FancyButton } from '../../shared/FancyButton';
import { SmallText } from '../../shared/SmallText';
import { LinkText } from '../../shared/LinkText';
import { API_URL } from '../../../constants/apiUrl';
import {
  FormWrapper,
  FormFieldGrid,
  ErrorMessage,
  ButtonContainer,
  SubmitErrorContainer,
  CheckboxFieldGrid
} from './styles';
import { TextLoader } from '../../shared/TextLoader';

export const RegisterForm: React.FC = () => {
  const [signingUp, setSigningUp] = useState(false);
  const [submitError, setSubmitError] = useState('');

  type FormValues = {
    username: string;
    email: string;
    password: string;
  };

  const onSubmit = async (values: FormValues) => {
    setSigningUp(true);
    // reset error
    setSubmitError('');
    try {
      await axios.post(`${API_URL}/signup`, {
        userHandle: values.username,
        email: values.email,
        password: values.password
      });
      setSigningUp(false);
      // do redirects here
    } catch (err) {
      /**
       * - POSSIBLE ERRORS
       * auth/email-already-in-use
       * auth/invalid-email
       * auth/operation-not-allowed
       * auth/weak-password
       * auth/username-already-taken
       */

      if (err.response.status >= 400) {
        switch (err.response.data.error.code) {
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
            validate={composeValidators(required, noWhitespace, minChar(4))}
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
            render={({ input, meta }) => (
              <CheckboxFieldGrid>
                <CheckboxInput {...input} type='checkbox' />
                <FieldLabel margin={fieldLabelMargins}>
                  <SmallText>
                    Accept <LinkText to=''>Terms and Conditions</LinkText>
                  </SmallText>
                </FieldLabel>
              </CheckboxFieldGrid>
            )}
          />

          <SubmitErrorContainer>
            <ErrorMessage>{submitError}</ErrorMessage>
          </SubmitErrorContainer>

          <ButtonContainer>
            <FancyButton onClick={handleSubmit}>
              {!signingUp && 'Sign Up'}{' '}
              <TextLoader loading={signingUp}>Authenticating...</TextLoader>
            </FancyButton>

            <SmallText>
              Already have an account? Click{' '}
              <LinkText to='/login'>here</LinkText> to sign in
            </SmallText>
          </ButtonContainer>
        </FormWrapper>
      )}
    />
  );
};
