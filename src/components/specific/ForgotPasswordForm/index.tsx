import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Form, Field } from 'react-final-form';
import {
  FormFieldGrid,
  ErrorMessage,
  MetaTextContainer
} from '../../shared/FormStyles';
import { FieldLabel } from '../../shared/FieldLabel';
import { Text } from '../../shared/Text';
import { TextInput } from '../../shared/TextInput';
import { FancyButton } from '../../shared/FancyButton';
import { TextLoader } from '../../shared/TextLoader';
import { FormWrapper } from './styles';

type Values = {
  email: string;
};

export const ForgotPasswordForm: React.FC = () => {
  const fieldLabelMargins = {
    left: 1,
    right: 0,
    bottom: 0,
    top: 0
  };

  const required = (value: any) => (value ? undefined : 'Required');
  const emailValidator = (value: string) =>
    /\s/g.test(value) || !value.includes('@') ? 'Invalid email' : undefined;
  const composeValidators = (...validators: any[]) => (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );

  const [submitError, setSubmitError] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const onSubmit = async (values: Values) => {
    try {
      setSendingEmail(true);
      await firebase.auth().sendPasswordResetEmail(values.email);
      setSendingEmail(false);

      setResetEmailSent(true);
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          setSubmitError('User not found');
          break;
        case 'auth/invalid-email':
          setSubmitError('Invalid email');
          break;
        default:
          setSubmitError('An unexpected error occured');
          break;
      }
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <FormWrapper onSubmit={handleSubmit}>
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
                  placeholder='Enter an account email'
                  hasError={meta.error && meta.touched}
                />
              </FormFieldGrid>
            )}
          />

          <MetaTextContainer>
            {resetEmailSent && !submitError && (
              <Text size={1.2}>Password reset email sent</Text>
            )}
            <ErrorMessage>{submitError}</ErrorMessage>
          </MetaTextContainer>

          <FancyButton onClick={handleSubmit}>
            {!sendingEmail && 'Submit'}
            <TextLoader loading={sendingEmail}>Sending Email...</TextLoader>
          </FancyButton>
        </FormWrapper>
      )}
    />
  );
};
