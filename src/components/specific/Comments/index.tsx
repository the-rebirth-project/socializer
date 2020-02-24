import React, { useEffect } from 'react';
import { CommentItem } from '../CommentItem';
import { Text } from '../../shared/Text';
import {
  useCommentsState,
  useCommentsDispatch
} from '../../../contexts/CommentsContext';
import { Post } from '../../../types/Post';
import { Wrapper, CommentsContainer } from './styles';

type CommentsProps = {
  post: Post;
};

export const Comments: React.FC<CommentsProps> = ({ post }) => {
  const commentsState = useCommentsState();
  const commentsDispatch = useCommentsDispatch();

  useEffect(() => {
    commentsDispatch({ type: 'SET_COMMENTS', payload: post.comments });
  }, [commentsDispatch, post.comments]);

  return (
    <Wrapper>
      <Text size={1.3} opacity={0.7}>
        Comments ({post.comments.length})
      </Text>
      <CommentsContainer>
        {commentsState.comments.map((comment, idx) => (
          <CommentItem
            comment={comment}
            index={idx}
            key={comment.id}
            numComments={commentsState.comments.length}
            postId={post.postId}
          />
        ))}
      </CommentsContainer>
    </Wrapper>
  );
};
