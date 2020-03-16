import React, { useState } from 'react';
import uuid from 'uuid/v4';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useUserState } from '../../../contexts/UserContext';
import {
  usePostsDispatch,
  usePostsState
} from '../../../contexts/PostsContext';
import { GradientBox } from '../../shared/GradientBox';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { FancyButton } from '../../shared/FancyButton';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Text } from '../../shared/Text';
import {
  Wrapper,
  UserHeader,
  UsernameContainer,
  Body,
  StyledTextArea,
  PostButtonContainer
} from './styles';

export const PostAdd: React.FC = () => {
  const db = firebase.firestore();
  const userState = useUserState();
  const postsDispatch = usePostsDispatch();
  const postsState = usePostsState();
  const [postBody, setPostBody] = useState('');

  const isPostBeingAdded = postsState.posts[0] && postsState.addingPost;

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(e.target.value);
  };

  const onPostSubmit = async () => {
    if (!isPostBeingAdded && postBody) {
      // pass value of postBody to another variable as we'll reset the input state on submit
      const postInput = postBody;
      setPostBody('');
      const { userHandle, userProfile, userId } = userState;
      const postId = uuid();

      const newPost = {
        body: postInput,
        userId,
        userProfile,
        createdAt: new Date().toISOString(),
        numComments: 0,
        numSeeds: 0
      };

      postsDispatch({
        type: 'ADD_POST',
        payload: {
          ...newPost,
          userHandle,
          postId,
          comments: [],
          isSeeded: false
        }
      });

      postsDispatch({
        type: 'SET_ADDING_POST',
        payload: true
      });

      try {
        await db
          .collection(`users/${userState.userId}/posts`)
          .doc(postId)
          .set(newPost);
        // also add to feed
        await db
          .collection(`users/${userState.userId}/feed`)
          .doc(postId)
          .set(newPost);
      } catch (err) {
        // TODO: Handle error
        console.log(err);
      }

      postsDispatch({
        type: 'SET_ADDING_POST',
        payload: false
      });
    }
  };

  return (
    <Wrapper>
      <GradientBox>
        <UserHeader>
          <CircleAvatar imgUrl={userState.userProfile} />
          <UsernameContainer>
            <Text size={1.6} weight={700}>
              {userState.userHandle}
            </Text>
          </UsernameContainer>
        </UserHeader>
      </GradientBox>

      <Body>
        <StyledTextArea
          id='addpost'
          placeholder='Add a post'
          rows={30}
          cols={100}
          maxRows={10}
          maxLength={3000}
          value={postBody}
          onChange={onTextAreaChanged}
          required
        />
        <OpacityLoader loading={isPostBeingAdded ? 1 : 0} defaultOpacity={1}>
          <PostButtonContainer>
            <FancyButton
              type='submit'
              onClick={onPostSubmit}
              disabled={isPostBeingAdded}
            >
              Post
            </FancyButton>
          </PostButtonContainer>
        </OpacityLoader>
      </Body>
    </Wrapper>
  );
};
