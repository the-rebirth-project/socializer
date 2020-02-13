import React, { useState } from 'react';
import moment from 'moment';
import uuid from 'uuid/v4';
import { usePostsDispatch, getReplies } from '../../../contexts/PostsContext';
import { useTextInputDispatch } from '../../../contexts/TextInputContext';
import { Text } from '../../shared/Text';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Comment, CommentMode, Post, Reply } from '../../../types';
import {
  Wrapper,
  RepliesContainer,
  ClickableSpan,
  StyledLoadingSpinner
} from './styles';

type CommentItemProps = {
  post: Post;
  comment: Comment;
  index: number;
};

export const CommentItem: React.FC<CommentItemProps> = ({
  post,
  comment,
  index
}) => {
  const textSize = 1.35;

  const { postId, postingComment } = post;
  const numComments = post.comments.length;
  const { postingReply, fetchedReplies, showReplies, localReplies } = comment;

  const postsDispatch = usePostsDispatch();
  const textInputDispatch = useTextInputDispatch();

  const [fetchingReplies, setFetchingReplies] = useState(false);
  // only apply the opacity loader to the last comment item
  const isLastComment = index === numComments - 1 ? true : false;

  const onViewRepliesClick = async () => {
    if (comment.numReplies > 0) {
      // reset all local replies if user clicks on view replies again
      postsDispatch({
        type: 'RESET_LOCAL_REPLIES',
        payload: { postId, commentId: comment.id }
      });

      postsDispatch({
        type: 'SET_SHOW_REPLIES',
        payload: {
          postId: post.postId,
          commentId: comment.id,
          value: !comment.showReplies
        }
      });
      // only fetch if we know for a fact that there are replies in the collection
      if (!fetchedReplies) {
        setFetchingReplies(true);
        await getReplies(postsDispatch, postId, comment.id);
        setFetchingReplies(false);
      }
    }
  };

  const onReplyClick = () => {
    textInputDispatch({ type: 'SET_POST_ID', payload: post.postId });
    textInputDispatch({ type: 'SET_COMMENT_ID', payload: comment.id });
    textInputDispatch({
      type: 'SET_COMMENT_MODE',
      payload: CommentMode.REPLY_COMMENT
    });
  };

  const renderReplyElement = (reply: Reply, loading: boolean) => (
    <Wrapper key={uuid()}>
      <>
        <OpacityLoader loading={loading ? 1 : 0} defaultOpacity={1}>
          <Text size={textSize} weight={700}>
            {reply.userHandle}{' '}
          </Text>
          <Text size={textSize}>{reply.body}</Text>
        </OpacityLoader>

        <Text size={1.2} opacity={0.7}>
          {moment(reply.createdAt)
            .local()
            .fromNow()}
        </Text>
      </>
    </Wrapper>
  );

  return (
    <Wrapper>
      {/* we use the index here to figure out which comment to use the loading logic on. any new comment is pushed into the comments array so it'd be at the very last index. we only apply the loading logic on that last comment as it'll be the one being added
       */}

      <OpacityLoader
        loading={isLastComment && postingComment ? 1 : 0}
        defaultOpacity={1}
      >
        <Text size={textSize} weight={700}>
          {comment.userHandle}{' '}
        </Text>

        <Text size={textSize}>{comment.body}</Text>
      </OpacityLoader>

      <Text size={1.2} opacity={0.7}>
        {moment(comment.createdAt)
          .local()
          .fromNow()}{' '}
        |{' '}
        <ClickableSpan onClick={!postingReply ? onViewRepliesClick : undefined}>
          {showReplies
            ? `Hide All Replies (${comment.numReplies})`
            : `View All Replies (${comment.numReplies})`}{' '}
        </ClickableSpan>
        |{' '}
        <ClickableSpan onClick={!postingReply ? onReplyClick : undefined}>
          Reply
        </ClickableSpan>
      </Text>

      <RepliesContainer>
        {showReplies && (
          <StyledLoadingSpinner loading={fetchingReplies ? 1 : 0} small>
            {comment.replies.map((reply, idx) => (
              <>
                {renderReplyElement(
                  reply,
                  comment.replies.length - 1 === idx && postingReply
                )}
              </>
            ))}
          </StyledLoadingSpinner>
        )}

        {localReplies.map((reply, idx) => (
          <>
            {renderReplyElement(
              reply,
              comment.replies.length - 1 === idx && postingReply
            )}
          </>
        ))}
      </RepliesContainer>
    </Wrapper>
  );
};
