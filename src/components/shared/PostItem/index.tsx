import React, { useState } from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
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
import { LinkText } from '../LinkText';

type PostItemProps = {
  post: Post;
  isAddingPost?: boolean;
};

export const PostItem: React.FC<PostItemProps> = ({ post, isAddingPost }) => {
  const db = firebase.firestore();
  const [isSeeded, setIsSeeded] = useState(post.isSeeded);
  const userState = useUserState();
  const [numSeeds, setNumSeeds] = useState(post.numSeeds);

  const seedPost = async () => {
    const { postId } = post;

    setIsSeeded(true);
    await db
      .doc(`users/${post.userId}/posts/${postId}`)
      .collection('seeds')
      .doc(userState.userId)
      .set({
        userId: userState.userId,
        userProfile: userState.userProfile
      });
  };

  const unseedPost = async () => {
    const { postId } = post;

    setIsSeeded(false);
    await db
      .doc(`users/${post.userId}/posts/${postId}`)
      .collection('seeds')
      .doc(userState.userId)
      .delete();
  };

  const onSeedClick = () => {
    if (isSeeded) {
      setNumSeeds(numSeeds - 1);
      unseedPost();
    } else {
      setNumSeeds(numSeeds + 1);
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
                  <LinkText to={`/users/${post.userHandle}`}>
                    {post.userHandle}
                  </LinkText>
                </Text>
              </UsernameContainer>

              <Text size={1.2} opacity={0.8}>
                posted{' '}
                {moment(post.createdAt)
                  .local()
                  .fromNow()}{' '}
                | {numSeeds} seed
                {numSeeds > 1 || numSeeds === 0 ? 's' : ''}
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
              postUserId={post.userId}
            />
            <CommentForm postId={post.postId} postUserId={post.userId} />
          </CommentsProvider>
        </PostBody>
      </OpacityLoader>
    </Wrapper>
  );
};
