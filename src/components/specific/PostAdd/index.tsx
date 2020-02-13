import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import firebase from 'firebase/app';
import uuid from 'uuid/v4';
import 'firebase/auth';
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
import { Post } from '../../../types';
import {
  Wrapper,
  UserHeader,
  UsernameContainer,
  Body,
  StyledTextArea,
  PostButtonContainer
} from './styles';
import { API_URL } from '../../../constants/apiUrl';

export const PostAdd: React.FC = () => {
  const userState = useUserState();
  const postsDispatch = usePostsDispatch();
  const postsState = usePostsState();
  const [postBody, setPostBody] = useState('');
  /* 
    checks to see if any posts are being added
    keep in mind that all newly added posts are added to the start of the posts arr
  */
  const isPostBeingAdded =
    postsState.posts[0] && postsState.posts[0].addingPost;

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostBody(e.target.value);
  };

  // const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter') {
  //     setPostBody(`${postBody}\n`);
  //   }
  // };

  const onPostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPostBeingAdded) {
      /* 
        Fields like createdAt and postId are "temporary" and are only added to obey the type definitions of Post
        Once we add the new post to the firebase db, we'll be fetching that post with the firebase provided postId and createdAt
      */
      // pass value of postBody to another variable as we'll reset the input state on submit
      const postInput = postBody;
      setPostBody('');

      const postId = uuid();

      const newPost: Post = {
        body: postInput,
        comments: [],
        addingPost: false,
        postingComment: false,
        likes: [],
        createdAt: new Date().toISOString(),
        postId,
        userHandle: userState.userHandle,
        userProfile: userState.userProfile
      };
      postsDispatch({ type: 'ADD_POST', payload: newPost });

      try {
        firebase.auth().onAuthStateChanged(async user => {
          if (user) {
            postsDispatch({
              type: 'SET_ADDING_POST',
              payload: {
                postId,
                value: true
              }
            });
            const idToken = await user.getIdToken();
            await axios.post(
              `${API_URL}/posts`,
              {
                postId,
                body: postInput
              },
              {
                headers: {
                  Authorization: `Bearer ${idToken}`
                }
              }
            );
            postsDispatch({
              type: 'SET_ADDING_POST',
              payload: {
                postId,
                value: false
              }
            });
          } else {
            navigate('/login');
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onTextPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardText = e.clipboardData.getData('text/plain');
    const postText = clipboardText + postBody;
    postText.length <= 3000 && setPostBody(postText);
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
            onPaste={onTextPaste}
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
