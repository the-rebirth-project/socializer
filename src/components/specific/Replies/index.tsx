import React from 'react';
import uuid from 'uuid/v4';
import { useRepliesState } from '../../../contexts/RepliesContext';
import { ReplyForm } from '../ReplyForm';
import { ReplyItem } from '../ReplyItem';
import { Wrapper, RepliesContainer, StyledLoadingSpinner } from './styles';
import { Reply } from '../../../types';

type RepliesProps = {
  commentUserHandle: string;
  commentUserId: string;
  postId: string;
  commentId: string;
  postUserId: string;
};

export const Replies: React.FC<RepliesProps> = ({
  commentUserHandle,
  postId,
  commentId,
  commentUserId,
  postUserId
}) => {
  const repliesState = useRepliesState();

  const renderReplyElements = (replies: Reply[]): JSX.Element => (
    <RepliesContainer>
      {replies.map((reply, idx) => (
        <ReplyItem
          key={uuid()}
          reply={reply}
          isFirstReply={idx === 0 ? true : false}
        />
      ))}
    </RepliesContainer>
  );

  return (
    <Wrapper>
      <ReplyForm
        commentUserHandle={commentUserHandle}
        commentUserId={commentUserId}
        commentId={commentId}
        postId={postId}
        postUserId={postUserId}
      />
      {repliesState.showReplies && (
        <StyledLoadingSpinner
          loading={repliesState.fetchingReplies ? 1 : 0}
          small
        >
          {renderReplyElements(repliesState.replies)}
        </StyledLoadingSpinner>
      )}

      {repliesState.localReplies.map((reply, idx) =>
        renderReplyElements(repliesState.localReplies)
      )}
    </Wrapper>
  );
};
