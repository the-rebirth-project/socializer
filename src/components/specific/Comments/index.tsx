import React from 'react';
import { CommentItem } from '../CommentItem';
import { Text } from '../../shared/Text';
import { Post } from '../../../types/Post';
import { Wrapper, CommentsContainer } from './styles';

type CommentsProps = {
  post: Post;
};

export const Comments: React.FC<CommentsProps> = ({ post }) => {
  return (
    <Wrapper>
      <Text size={1.3} opacity={0.7}>
        Comments ({post.comments.length})
      </Text>
      <CommentsContainer>
        {post.comments.map((comment, idx) => (
          <CommentItem
            post={post}
            comment={comment}
            index={idx}
            key={comment.id}
          />
        ))}
      </CommentsContainer>
    </Wrapper>
  );
};
