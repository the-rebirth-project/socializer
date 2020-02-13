import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';
import uuid from 'uuid/v4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { BoldText } from '../../shared/BoldText';
import { Text } from '../../shared/Text';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Comments } from '../Comments';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { GradientBox } from '../../shared/GradientBox';
import {
  useTextInputState,
  useTextInputDispatch
} from '../../../contexts/TextInputContext';
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
  SendBtnWrapper,
  CommentInputLabel
} from './styles';
import { CommentMode, Post } from '../../../types';
import { API_URL } from '../../../constants/apiUrl';
import { navigate } from '@reach/router';
import { usePostsDispatch } from '../../../contexts/PostsContext';

// TODO: Move svg defs to another file
// TODO: Move liking post, adding posts, adding replies and adding comments to separate async actions with dispatch as arg

type PostItemProps = {
  post: Post;
};

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const userState = useUserState();

  // for figuring out if we're replying to a comment or just commenting on a post
  const textInputState = useTextInputState();
  const textInputDispatch = useTextInputDispatch();
  const isReplying = textInputState.commentMode === CommentMode.REPLY_COMMENT;

  // comment text input ref
  const commentInputRef = useRef<HTMLInputElement>(null);

  const postsDispatch = usePostsDispatch();
  const [commentInput, setCommentInput] = useState('');
  const isLiked =
    post.likes.filter(like => like.userHandle === userState.userHandle)
      .length !== 0;

  useEffect(() => {
    if (isReplying && textInputState.postId === post.postId)
      commentInputRef.current && commentInputRef.current.focus();
  }, [isReplying, post.postId, textInputState.postId]);

  const onCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const onInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCommentSubmit();
    }
  };

  const onCommentOutOfFocus = () => {
    if (textInputState.commentMode === CommentMode.REPLY_COMMENT)
      textInputDispatch({
        type: 'SET_COMMENT_MODE',
        payload: CommentMode.POST_COMMENT
      });
  };

  const onCommentSubmit = () => {
    // do not add comment if input is empty
    if (commentInput) {
      if (isReplying) {
        // add a reply instead
        const { commentId } = textInputState;
        const { postId } = post;
        const replyId = uuid();

        postsDispatch({
          type: 'ADD_REPLY',
          payload: {
            replyId,
            commentId,
            postId,
            body: commentInput,
            userHandle: userState.userHandle
          }
        });

        firebase.auth().onAuthStateChanged(async user => {
          if (user) {
            try {
              // disable all inputs while we're adding the reply
              postsDispatch({
                type: 'SET_POSTING_COMMENT',
                payload: {
                  postId: post.postId,
                  value: true
                }
              });
              postsDispatch({
                type: 'SET_POSTING_REPLY',
                payload: {
                  postId,
                  commentId,
                  value: true
                }
              });

              const idToken = await user.getIdToken();
              await axios.post(
                `${API_URL}/posts/comments/replies`,
                {
                  replyId,
                  commentId,
                  postId,
                  replyBody: commentInput
                },
                {
                  headers: {
                    Authorization: `Bearer ${idToken}`
                  }
                }
              );
            } catch (err) {
              // TODO: HANDLE ERROR
              console.log(err);
            }

            postsDispatch({
              type: 'SET_POSTING_COMMENT',
              payload: {
                postId: post.postId,
                value: false
              }
            });
            postsDispatch({
              type: 'SET_POSTING_REPLY',
              payload: {
                postId,
                commentId,
                value: false
              }
            });

            textInputDispatch({
              type: 'SET_COMMENT_MODE',
              payload: CommentMode.POST_COMMENT
            });
          } else {
            navigate('/login');
          }
        });
      } else {
        const commentId = uuid();

        postsDispatch({
          type: 'ADD_COMMENT',
          payload: {
            commentId,
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
              console.log(post.postingComment);
              const idToken = await user?.getIdToken();
              await axios.post(
                `${API_URL}/posts/add-comment`,
                {
                  commentId,
                  postId: post.postId,
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
              console.log(post.postingComment);
            } catch (err) {
              // TODO: HANDLE ERROR
              console.log(err);
            }
          } else {
            navigate('/login');
          }
        });
      }

      setCommentInput('');
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
      <OpacityLoader loading={post.addingPost ? 1 : 0} defaultOpacity={1}>
        <GradientBox>
          <PostHeader>
            <ProfilePictureContainer>
              <CircleAvatar imgUrl={post.userProfile} />
            </ProfilePictureContainer>

            <PostMetadata>
              <UsernameContainer>
                <BoldText size={1.6}>{post.userHandle}</BoldText>
              </UsernameContainer>

              <Text size={1.2} opacity={0.8}>
                posted{' '}
                {moment(post.createdAt)
                  .local()
                  .fromNow()}{' '}
                | {post.likes.length} seed
                {post.likes.length > 1 || post.likes.length === 0 ? 's' : ''}
              </Text>
            </PostMetadata>
            <SvgWrapper likedPost={isLiked} onClick={likePost}>
              <FontAwesomeIcon icon={faSeedling} />
            </SvgWrapper>
          </PostHeader>
        </GradientBox>

        <PostBody>
          <ParagraphText>{post.body}</ParagraphText>
          {post.comments.length > 0 && <Comments post={post} />}

          <OpacityLoader
            loading={post.postingComment ? 1 : 0}
            defaultOpacity={1}
          >
            <CommentInputFieldContainer>
              <CommentTextInput
                type='text'
                placeholder={isReplying ? 'Reply to comment' : 'Add a comment'}
                value={commentInput}
                onChange={onCommentInputChange}
                onKeyPress={onInputEnter}
                onBlur={onCommentOutOfFocus}
                disabled={post.postingComment}
                ref={commentInputRef}
              />
              <CommentInputLabel>
                {isReplying ? 'Replying to a comment' : 'Commenting on a post'}
              </CommentInputLabel>
              <SendBtnWrapper onClick={onCommentSubmit}>
                <SendBtn icon={faPaperPlane} />
              </SendBtnWrapper>
            </CommentInputFieldContainer>
          </OpacityLoader>
        </PostBody>
      </OpacityLoader>
    </Wrapper>
  );
};
