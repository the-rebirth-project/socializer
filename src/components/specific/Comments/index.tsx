import React from 'react';
import uuid from 'uuid/v4';
import moment from 'moment';
import { Text } from '../../shared/Text';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Post } from '../../../types/Post';
import { Wrapper, CommentContainer } from './styles';

type CommentsProps = {
  post: Post;
};

export const Comments: React.FC<CommentsProps> = ({ post }) => {
  const textSize = 1.35; // in rem units

  return (
    <Wrapper>
      <Text size={1.3} opacity={0.7}>
        Comments ({post.comments.length})
      </Text>
      {post.comments.map((comment, idx) => (
        <CommentContainer key={uuid()}>
          {/* we use the index here to figure out which comment to use the loading logic on. any new comment is pushed into the comments array so it'd be at the very last index. we only apply the loading logic on that last comment as it'll be the one being added
           */}
          {idx === post.comments.length - 1 ? (
            <>
              <OpacityLoader loading={post.postingComment} defaultOpacity={1}>
                <Text size={textSize} weight={700}>
                  {comment.userHandle}
                </Text>
              </OpacityLoader>
              <OpacityLoader loading={post.postingComment} defaultOpacity={1}>
                <Text size={textSize}>{comment.body}</Text>
              </OpacityLoader>
              <Text size={1.2} opacity={0.7}>
                {moment(comment.createdAt)
                  .local()
                  .fromNow()}
              </Text>
            </>
          ) : (
            <>
              <Text size={textSize} weight={700}>
                {comment.userHandle}
              </Text>

              <Text size={textSize}>{comment.body}</Text>
              <Text size={1.2} opacity={0.7}>
                {moment(comment.createdAt)
                  .local()
                  .fromNow()}
              </Text>
            </>
          )}
        </CommentContainer>
      ))}
    </Wrapper>
  );
};
