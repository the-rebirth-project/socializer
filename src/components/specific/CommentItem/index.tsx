import React from 'react';
import moment from 'moment';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCommentsState } from '../../../contexts/CommentsContext';
import {
  useRepliesState,
  useRepliesDispatch
} from '../../../contexts/RepliesContext';
import { Replies } from '../Replies';
import { Text } from '../../shared/Text';
import { CommentReplyWrapper } from '../../shared/CommentReplyWrapper';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Comment } from '../../../types';
import { ClickableSpan } from './styles';

type CommentItemProps = {
  isLastComment: boolean;
  comment: Comment;
  postId: string;
  postUserId: string;
};

export const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  isLastComment,
  postId,
  postUserId
}) => {
  const db = firebase.firestore();
  const textSize = 1.35;

  const repliesDispatch = useRepliesDispatch();
  const repliesState = useRepliesState();
  const commentsState = useCommentsState();
  const { postingComment } = commentsState;

  const onViewRepliesClick = async () => {
    // show/hide replies
    repliesDispatch({
      type: 'SHOW_REPLIES',
      payload: !repliesState.showReplies
    });
    repliesDispatch({ type: 'RESET_LOCAL_REPLIES' });

    if (comment.numReplies > 0) {
      // do not fetch if we've already done so
      if (!repliesState.fetchedReplies) {
        repliesDispatch({ type: 'SET_FETCHING_REPLIES', payload: true });
        try {
          const repliesCollection = await db
            .doc(`users/${postUserId}/posts/${postId}/comments/${comment.id}`)
            .collection('replies')
            .get();

          const repliesDataPromises = repliesCollection.docs.map(async d => {
            const userDoc = await db
              .collection('users')
              .doc(d.data().userId)
              .get();
            return {
              id: d.id,
              body: d.data().body,
              createdAt: d.data().createdAt,
              userId: d.data().userId,
              userHandle: userDoc.exists
                ? userDoc.data()?.userHandle
                : '[deleted user]'
            };
          });

          const repliesData = await Promise.all(repliesDataPromises);

          repliesDispatch({ type: 'SET_REPLIES', payload: repliesData });
          repliesDispatch({ type: 'SET_FETCHED_REPLIES', payload: true });
        } catch (err) {
          // TODO: Handle error
          console.log(err);
        }

        repliesDispatch({ type: 'SET_FETCHING_REPLIES', payload: false });
      }
    }
  };

  return (
    <CommentReplyWrapper>
      {/* we use the index here to figure out which comment to use the loading logic on. any new comment is pushed into the comments array so it'd be at the very last index. we only apply the loading logic on that last comment as it'll be the one being added
       */}

      <OpacityLoader
        loading={isLastComment && postingComment ? 1 : 0}
        defaultOpacity={1}
      >
        <Text size={textSize} weight={700}>
          {comment.userHandle}{' '}
        </Text>
      </OpacityLoader>

      <OpacityLoader
        loading={isLastComment && postingComment ? 1 : 0}
        defaultOpacity={1}
      >
        <Text size={textSize}>{comment.body}</Text>
      </OpacityLoader>

      <Text size={1.2} opacity={0.7}>
        {moment(comment.createdAt)
          .local()
          .fromNow()}{' '}
        |{' '}
        <ClickableSpan
          onClick={!repliesState.postingReply ? onViewRepliesClick : undefined}
        >
          {repliesState.showReplies
            ? `Hide All Replies (${comment.numReplies})`
            : `View All Replies (${comment.numReplies})`}{' '}
        </ClickableSpan>
      </Text>

      {/* Will only show when showReplies is true */}
      <Replies
        commentUserHandle={comment.userHandle}
        postId={postId}
        commentId={comment.id}
        postUserId={postUserId}
      />
    </CommentReplyWrapper>
  );
};
