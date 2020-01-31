import React from 'react';
import { Form, Field } from 'react-final-form';
import { FieldLabel } from '../../shared/FieldLabel';
import { TextInput } from '../../shared/TextInput';
import { FormWrapper, FormFieldGrid, ErrorMessage } from './styles';

export const RegisterForm: React.FC = () => {
  const onSubmit = () => {};

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
        </FormWrapper>
      )}
    />
  );
};
