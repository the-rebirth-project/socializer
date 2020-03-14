import React, { useEffect } from 'react';
import { CommentItem } from '../CommentItem';
import {
  useCommentsState,
  useCommentsDispatch
} from '../../../contexts/CommentsContext';
import { RepliesProvider } from '../../../contexts/RepliesContext';
import { Text } from '../../shared/Text';
import { Comment } from '../../../types';
import { Wrapper, CommentsContainer } from './styles';

type CommentsProps = {
  comments: Comment[];
  postId: string;
  numComments: number;
  postUserHandle: string;
};

export const Comments: React.FC<CommentsProps> = ({
  comments,
  postId,
  numComments,
  postUserHandle
}) => {
  const commentsState = useCommentsState();
  const commentsDispatch = useCommentsDispatch();

  useEffect(() => {
    commentsDispatch({ type: 'SET_COMMENTS', payload: comments });
  }, [commentsDispatch, comments]);

  return (
    <>
      <Text size={1.3} opacity={0.7}>
        Comments ({numComments})
      </Text>

      {commentsState.comments.length > 0 && (
        <Wrapper>
          <CommentsContainer>
            {commentsState.comments.map((comment, idx) => (
              <RepliesProvider key={comment.id}>
                <CommentItem
                  comment={comment}
                  key={comment.id}
                  postId={postId}
                  postUserHandle={postUserHandle}
                  isLastComment={
                    idx === commentsState.comments.length - 1 ? true : false
                  }
                />
              </RepliesProvider>
            ))}
          </CommentsContainer>
        </Wrapper>
      )}
    </>
  );
};
