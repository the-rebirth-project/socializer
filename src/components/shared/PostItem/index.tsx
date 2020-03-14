import React, { useState } from 'react';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import { CommentForm } from '../../specific/CommentForm';
import { Text } from '../Text';
import { OpacityLoader } from '../OpacityLoader';
import { Comments } from '../../specific/Comments';
import { CircleAvatar } from '../CircleAvatar';
import { GradientBox } from '../GradientBox';
import { SvgDefs } from './SvgDefs';
import { CommentsProvider } from '../../../contexts/CommentsContext';
import { useUserState } from '../../../contexts/UserContext';
import { Post } from '../../../types';
import {
  Wrapper,
  PostHeader,
  PostMetadata,
  UsernameContainer,
  ProfilePictureContainer,
  PostBody,
  ParagraphText,
  SvgWrapper
} from './styles';

type PostItemProps = {
  post: Post;
  isAddingPost?: boolean;
};

export const PostItem: React.FC<PostItemProps> = ({ post, isAddingPost }) => {
  const db = firebase.firestore();
  const [isSeeded, setIsSeeded] = useState(post.isSeeded);
  const userState = useUserState();

  const seedPost = async () => {
    const { postId } = post;

    setIsSeeded(true);
    await db
      .doc(`users/${post.userHandle}/posts/${postId}`)
      .collection('seeds')
      .doc(userState.userHandle)
      .set({
        userHandle: userState.userHandle,
        userProfile: userState.userProfile
      });
  };

  const unseedPost = async () => {
    const { postId } = post;

    setIsSeeded(false);
    await db
      .doc(`users/${post.userHandle}/posts/${postId}`)
      .collection('seeds')
      .doc(userState.userHandle)
      .delete();
  };

  const onSeedClick = () => {
    if (isSeeded) {
      unseedPost();
    } else {
      seedPost();
    }
  };

  return (
    <Wrapper>
      <SvgDefs />

      <OpacityLoader loading={isAddingPost ? 1 : 0} defaultOpacity={1}>
        <GradientBox>
          <PostHeader>
            <ProfilePictureContainer>
              <CircleAvatar imgUrl={post.userProfile} />
            </ProfilePictureContainer>

            <PostMetadata>
              <UsernameContainer>
                <Text weight={700} size={1.6}>
                  {post.userHandle}
                </Text>
              </UsernameContainer>

              <Text size={1.2} opacity={0.8}>
                posted{' '}
                {moment(post.createdAt)
                  .local()
                  .fromNow()}{' '}
                | {post.numSeeds} seed
                {post.numSeeds > 1 || post.numSeeds === 0 ? 's' : ''}
              </Text>
            </PostMetadata>
            <SvgWrapper likedPost={isSeeded} onClick={onSeedClick}>
              <FontAwesomeIcon icon={faSeedling} />
            </SvgWrapper>
          </PostHeader>
        </GradientBox>

        <PostBody>
          <ParagraphText>{post.body}</ParagraphText>
          <CommentsProvider>
            <Comments
              comments={post.comments}
              postId={post.postId}
              numComments={post.numComments}
              postUserHandle={post.userHandle}
            />
            <CommentForm
              postId={post.postId}
              postUserHandle={post.userHandle}
            />
          </CommentsProvider>
        </PostBody>
      </OpacityLoader>
    </Wrapper>
  );
};
