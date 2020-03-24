import React, { useState } from 'react';
import uuid from 'uuid/v4';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAlert } from 'react-alert';
import { useUserState } from '../../../contexts/UserContext';
import {
  useCommentsDispatch,
  useCommentsState
} from '../../../contexts/CommentsContext';
import { SendButton } from '../../shared/SendButton';
import { Text } from '../../shared/Text';
import { StyledTextArea } from '../../shared/StyledTextArea';
import { CommentReplyFormContainer } from '../../shared/CommentReplyFormContainer';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Wrapper } from './styles';

type CommentFormProps = {
  postId: string;
  postUserId: string;
};

/* 
  This component is mostly just a lot of api calls and handling really minute state details of the UI
  It may look lengthy but I decided it was better to keep the async actions in the component itself
*/

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  postUserId
}) => {
  const db = firebase.firestore();
  const alert = useAlert();

  const [commentText, setCommentText] = useState('');
  const { userHandle, userId } = useUserState();
  const commentsDispatch = useCommentsDispatch();
  const commentsState = useCommentsState();

  const onCommentSubmit = async () => {
    if (commentText) {
      // pass by value
      const commentInput = commentText;
      // reset input
      setCommentText('');
      const commentId = uuid();
      const newComment = {
        id: commentId,
        userId,
        body: commentInput,
        createdAt: new Date().toISOString(),
        numReplies: 0
      };

      commentsDispatch({
        type: 'ADD_COMMENT',
        payload: {
          ...newComment,
          userHandle
        }
      });

      commentsDispatch({
        type: 'INCREMENT_NUM_COMMENTS'
      });

      commentsDispatch({
        type: 'SET_POSTING_COMMENT',
        payload: true
      });

      try {
        await db
          .doc(`users/${postUserId}/posts/${postId}`)
          .collection('comments')
          .doc(commentId)
          .set(newComment);

        if (userId !== postUserId) {
          const notifId = uuid();
          await db
            .doc(`users/${postUserId}`)
            .collection('notifications')
            .doc(notifId)
            .set({
              userId,
              message: 'commented on your post.',
              createdAt: new Date().toISOString()
            });
        }
      } catch (err) {
        alert.error(`We were unable to save your comment to the database :(`);
      }

      commentsDispatch({ type: 'SET_POSTING_COMMENT', payload: false });
    }
  };

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <Wrapper>
      <OpacityLoader
        loading={commentsState.postingComment ? 1 : 0}
        defaultOpacity={1}
      >
        <Text size={1.35} weight={700}>
          {userHandle}
        </Text>
        <CommentReplyFormContainer>
          <StyledTextArea
            maxRows={5}
            maxLength={1500}
            placeholder='Add a comment'
            value={commentText}
            onChange={onTextAreaChange}
            disabled={commentsState.postingComment}
            required
          />
          <SendButton
            onClick={onCommentSubmit}
            disabled={commentsState.postingComment}
          />
        </CommentReplyFormContainer>
      </OpacityLoader>
    </Wrapper>
  );
};
