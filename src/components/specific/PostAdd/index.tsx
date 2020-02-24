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

  const isPostBeingAdded =
    postsState.posts[0] && postsState.posts[0].addingPost;

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(e.target.value);
  };

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPostBeingAdded) {
      // pass value of postBody to another variable as we'll reset the input state on submit
      const postInput = postBody;
      setPostBody('');
      const { userHandle, userProfile } = userState;
      const postId = uuid();

      const newPost = {
        body: postInput,
        userHandle,
        userProfile,
        createdAt: new Date().toISOString()
      };

      try {
        postsDispatch({
          type: 'SET_ADDING_POST',
          payload: {
            postId,
            value: true
          }
        });

        await db
          .collection('posts')
          .doc(postId)
          .set(newPost);

        postsDispatch({
          type: 'ADD_POST',
          payload: {
            ...newPost,
            postId,
            comments: [],
            replies: [],
            likes: [],
            addingPost: false,
            postingComment: false
          }
        });
      } catch (err) {
        // TODO: Handle error
        console.log(err);
      }

      postsDispatch({
        type: 'SET_ADDING_POST',
        payload: {
          postId,
          value: false
        }
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
        <form onSubmit={onPostSubmit}>
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
              <FancyButton type='submit'>Post</FancyButton>
            </PostButtonContainer>
          </OpacityLoader>
        </form>
      </Body>
    </Wrapper>
  );
};
