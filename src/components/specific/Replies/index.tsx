import React from 'react';
import uuid from 'uuid/v4';
import { useRepliesState } from '../../../contexts/RepliesContext';
import { ReplyForm } from '../ReplyForm';
import { ReplyItem } from '../ReplyItem';
import { Wrapper, RepliesContainer, StyledLoadingSpinner } from './styles';
import { Reply } from '../../../types';

type RepliesProps = {
  commentUserHandle: string;
  postId: string;
  commentId: string;
  postUserHandle: string;
};

export const Replies: React.FC<RepliesProps> = ({
  commentUserHandle,
  postId,
  commentId,
  postUserHandle
}) => {
  const repliesState = useRepliesState();

  const renderReplyElements = (replies: Reply[]): JSX.Element => (
    <RepliesContainer>
      {replies.map((reply, idx) => (
        <ReplyItem
          key={uuid()}
          reply={reply}
          isLastReply={replies.length - 1 === idx ? true : false}
        />
      ))}
    </RepliesContainer>
  );

  return (
    <Wrapper>
      <ReplyForm
        commentUserHandle={commentUserHandle}
        commentId={commentId}
        postId={postId}
        postUserHandle={postUserHandle}
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
