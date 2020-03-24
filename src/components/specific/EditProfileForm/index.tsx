import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { navigate } from '@reach/router';
import { useAlert } from 'react-alert';
import { Form, Field } from 'react-final-form';
import { useUserState, useUserDispatch } from '../../../contexts/UserContext';
import { TextLoader } from '../../shared/TextLoader';
import { TextInput } from '../../shared/TextInput';
import { SecondaryButton } from '../../shared/SecondaryButton';
import { FieldLabel } from '../../shared/FieldLabel';
import {
  FormFieldGrid,
  ErrorMessage,
  MetaTextContainer
} from '../../shared/FormStyles';
import {
  required,
  minChar,
  maxChar,
  noWhitespace,
  composeValidators
} from '../../../utils/formValidators';
import { FormWrapper, TextArea, ButtonContainer } from './styles';
import { CustomError } from '../../../utils';

type FormValues = {
  username: string;
  bio: string;
  location: string;
};

export const EditProfileForm: React.FC = () => {
  const db = firebase.firestore();
  const fieldLabelMargins = {
    left: 1,
    right: 0,
    bottom: 0,
    top: 0
  };

  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const alert = useAlert();

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSaving(true);
      // only check if the user handle has changed
      if (userState.userHandle !== values.username) {
        const snap = await db
          .collection('users')
          .where('userHandle', '==', values.username)
          .get();
        // if we find a user with the same username, throw error
        if (snap.docs.length > 0)
          throw new CustomError(
            'auth/username-already-taken',
            'Taken username'
          );
      }

      await db.doc(`users/${userState.userId}`).update({
        userHandle: values.username,
        bio: values.bio,
        location: values.location
      });
      // update state
      userDispatch({
        type: 'SET_USER',
        payload: {
          email: userState.email,
          userId: userState.userId,
          userProfile: userState.userProfile,
          userHandle: values.username,
          bio: values.bio,
          location: values.location
        }
      });

      // update firebase auth profile
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          await user.updateProfile({
            displayName: values.username
          });
        } else {
          navigate('/login');
        }
      });

      alert.removeAll();
      alert.success('Successfully updated profile details');
    } catch (err) {
      switch (err.code) {
        case 'auth/username-already-taken':
          setError('Username is already taken');
          alert.error('Username is taken');
          break;
        default:
          setError('An unexpected error occured');
          alert.error('An unexpected error occured');
          break;
      }
    }

    setIsSaving(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        username: userState.userHandle,
        bio: userState.bio,
        location: userState.location
      }}
      render={({ handleSubmit, values }) => (
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
                  placeholder='Enter your new username'
                  hasError={meta.error && meta.touched}
                />
              </FormFieldGrid>
            )}
          />

          <Field
            name='bio'
            validate={composeValidators(required, minChar(10), maxChar(101))}
            render={({ input, meta }) => (
              <FormFieldGrid>
                <FieldLabel
                  margin={fieldLabelMargins}
                  hasError={meta.error && meta.touched}
                >
                  Bio
                  {meta.error && meta.touched && (
                    <ErrorMessage> | {meta.error}</ErrorMessage>
                  )}
                </FieldLabel>

                <TextArea
                  {...input}
                  minRows={2}
                  maxRows={5}
                  placeholder={'Add a bio describing yourself'}
                />
              </FormFieldGrid>
            )}
          />

          <Field
            name='location'
            validate={composeValidators(required, maxChar(32))}
            render={({ input, meta }) => (
              <FormFieldGrid>
                <FieldLabel
                  margin={fieldLabelMargins}
                  hasError={meta.error && meta.touched}
                >
                  Location
                  {meta.error && meta.touched && (
                    <ErrorMessage> | {meta.error}</ErrorMessage>
                  )}
                </FieldLabel>

                <TextInput
                  {...input}
                  type='text'
                  autoComplete='off'
                  placeholder='Enter a location'
                  hasError={meta.error && meta.touched}
                />
              </FormFieldGrid>
            )}
          />

          {error && (
            <MetaTextContainer>
              <ErrorMessage>{error}</ErrorMessage>
            </MetaTextContainer>
          )}

          <ButtonContainer>
            <SecondaryButton
              onClick={handleSubmit}
              disabled={
                (values.username === userState.userHandle &&
                  values.bio === userState.bio &&
                  values.location === userState.location) ||
                isSaving
              }
            >
              {!isSaving ? (
                'Save'
              ) : (
                <TextLoader loading={isSaving}>Saving...</TextLoader>
              )}
            </SecondaryButton>
          </ButtonContainer>
        </FormWrapper>
      )}
    />
  );
};
