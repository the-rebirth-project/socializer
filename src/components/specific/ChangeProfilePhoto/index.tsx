import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { useAlert } from 'react-alert';
import FileUploader from 'react-firebase-file-uploader';
import { useUserState, useUserDispatch } from '../../../contexts/UserContext';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { TextLoader } from '../../shared/TextLoader';
import { Wrapper, UploadButton } from './styles';

export const ChangeProfilePhoto: React.FC = () => {
  const db = firebase.firestore();
  const [isUploading, setIsUploading] = useState(false);
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const alert = useAlert();

  const onUploadSuccess = async (filename: string) => {
    try {
      const imageURL = await firebase
        .storage()
        .ref(`users/${userState.userId}`)
        .child(filename)
        .getDownloadURL();

      await db
        .doc(`users/${userState.userId}`)
        .update({ profileImageURL: imageURL });

      userDispatch({ type: 'CHANGE_PROFILE_PHOTO', payload: imageURL });
      setIsUploading(false);
      alert.success('Successfully updated profile photo');
    } catch (err) {
      alert.error('Something went wrong while updating your profile :(');
    }
  };

  const onUploadError = () => {
    setIsUploading(false);
    alert.error('Something went wrong while uploading your photo :(');
  };

  return (
    <Wrapper>
      <CircleAvatar imgUrl={userState.userProfile} sizeScaling={2} />
      <UploadButton disabled={isUploading}>
        {!isUploading && 'Change Photo'}
        <TextLoader loading={isUploading}>Uploading...</TextLoader>

        <FileUploader
          accept='image/*'
          name='avatar'
          filename='profile'
          hidden
          maxHeight={1080}
          maxWidth={1080}
          storageRef={firebase.storage().ref(`users/${userState.userId}`)}
          onUploadStart={() => setIsUploading(true)}
          onUploadSuccess={onUploadSuccess}
          onUploadError={onUploadError}
        />
      </UploadButton>
    </Wrapper>
  );
};
