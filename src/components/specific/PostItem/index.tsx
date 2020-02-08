import React, { useState } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BoldText } from '../../shared/BoldText';
import { Text } from '../../shared/Text';
import { Comments } from '../Comments';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { useUserState } from '../../../contexts/UserContext';
import {
  Wrapper,
  PostHeader,
  PostMetadata,
  UsernameContainer,
  ProfilePictureContainer,
  PostBody,
  ParagraphText,
  CommentTextInput,
  SvgWrapper,
  CommentInputFieldContainer,
  SendBtn,
  SendBtnWrapper
} from './styles';
import { Post } from '../../../types';
import { API_URL } from '../../../constants/apiUrl';
import { navigate } from '@reach/router';
import { usePostsDispatch } from '../../../contexts/PostsContext';
import { OpacityLoader } from '../../shared/OpacityLoader';

// TODO: Move svg defs to another file

type PostItemProps = {
  post: Post;
};

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const userState = useUserState();
  const postsDispatch = usePostsDispatch();
  const [commentInput, setCommentInput] = useState('');
  const isLiked =
    post.likes.filter(like => like.userHandle === userState.userHandle)
      .length !== 0;

  const onCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const onInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommentSubmit();
    }
  };

  const onCommentSubmit = () => {
    // do not add comment if input is empty
    if (commentInput) {
      postsDispatch({
        type: 'ADD_COMMENT',
        payload: {
          postId: post.postId,
          commentBody: commentInput,
          userHandle: userState.userHandle
        }
      });

      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            postsDispatch({
              type: 'SET_POSTING_COMMENT',
              payload: {
                postId: post.postId,
                value: true
              }
            });
            const idToken = await user?.getIdToken();
            await axios.post(
              `${API_URL}/posts/add-comment`,
              {
                postId: post.postId,
                userHandle: userState.userHandle,
                commentBody: commentInput
              },
              {
                headers: {
                  Authorization: `Bearer ${idToken}`
                }
              }
            );
            postsDispatch({
              type: 'SET_POSTING_COMMENT',
              payload: {
                postId: post.postId,
                value: false
              }
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          navigate('/login');
        }
      });

      setCommentInput('');
      console.log(post);
    }
  };

  const likePost = async () => {
    if (!isLiked) {
      // dispatch like to post
      postsDispatch({
        type: 'LIKE_POST',
        payload: { postId: post.postId, userHandle: userState.userHandle }
      });

      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            const idToken = await user.getIdToken();
            await axios.post(
              `${API_URL}/posts/like-post`,
              {
                postId: post.postId
              },
              {
                headers: {
                  Authorization: `Bearer ${idToken}`
                }
              }
            );
          } catch (err) {
            console.error(err);
          }
        } else {
          navigate('/login');
        }
      });
    } else {
      postsDispatch({
        type: 'UNLIKE_POST',
        payload: {
          postId: post.postId,
          userHandle: userState.userHandle
        }
      });

      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            const idToken = await user.getIdToken();
            await axios.delete(`${API_URL}/posts/unlike-post/${post.postId}`, {
              headers: {
                Authorization: `Bearer ${idToken}`
              }
            });
          } catch (err) {
            // TODO: Handle error
            console.error(err);
          }
        } else {
          navigate('/login');
        }
      });
    }
  };

  return (
    <Wrapper>
      <svg width='0' height='0'>
        <defs>
          <linearGradient id='lgrad' x1='16%' y1='100%' x2='84%' y2='0%'>
            <stop offset='0%' stopColor='rgb(13,255,214)' stopOpacity={1} />
            <stop offset='100%' stopColor='rgb(219, 251, 0)' stopOpacity={1} />
          </linearGradient>
          <filter id='dropShadowGraphic' x='0' y='0' width='200%' height='200%'>
            <feOffset result='offOut' in='SourceGraphic' dx='12' dy='6' />
            <feGaussianBlur result='blurOut' in='offOut' stdDeviation='10' />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>
          <filter id='dropShadowWhite' x='0' y='0' width='200%' height='200%'>
            <feOffset result='offOut' in='SourceGraphic' dx='0' dy='3' />
            <feColorMatrix
              result='matrixOut'
              in='offOut'
              type='matrix'
              values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'
            />
            <feGaussianBlur result='blurOut' in='offOut' stdDeviation='6' />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>

          <linearGradient id='sendBtnGrad' x1='16%' y1='100%' x2='84%' y2='0%'>
            <stop offset='0%' stopColor='rgb(128,0,255)' stopOpacity={1} />
            <stop offset='100%' stopColor='rgb(86,170,255)' stopOpacity={1} />
          </linearGradient>
        </defs>
      </svg>
      <PostHeader>
        <ProfilePictureContainer>
          <CircleAvatar imgUrl={post.userProfile} />
        </ProfilePictureContainer>

        <PostMetadata>
          <UsernameContainer>
            <BoldText size={1.6}>{post.userHandle}</BoldText>
          </UsernameContainer>

          <Text size={1.2} opacity={0.8}>
            posted 1m ago | {post.likes.length} seed
            {post.likes.length > 1 ? 's' : ''}
          </Text>
        </PostMetadata>
        <SvgWrapper likedPost={isLiked} onClick={likePost}>
          <FontAwesomeIcon icon={faSeedling} />
        </SvgWrapper>
      </PostHeader>
      <PostBody>
        <ParagraphText>{post.body}</ParagraphText>
        {post.comments.length > 0 && <Comments post={post} />}

        <OpacityLoader loading={post.postingComment} defaultOpacity={1}>
          <CommentInputFieldContainer>
            <CommentTextInput
              type='text'
              placeholder='Add a comment'
              value={commentInput}
              onChange={onCommentInputChange}
              onKeyPress={onInputEnter}
              disabled={post.postingComment}
            />
            <SendBtnWrapper onClick={onCommentSubmit}>
              <SendBtn icon={faPaperPlane} />
            </SendBtnWrapper>
          </CommentInputFieldContainer>
        </OpacityLoader>
      </PostBody>
    </Wrapper>
  );
};
