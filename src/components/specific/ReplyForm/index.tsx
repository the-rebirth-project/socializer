import React, { useState } from 'react';
import uuid from 'uuid/v4';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAlert } from 'react-alert';
import {
  useRepliesState,
  useRepliesDispatch
} from '../../../contexts/RepliesContext';
import { useUserState } from '../../../contexts/UserContext';
import { Text } from '../../shared/Text';
import { StyledTextArea } from '../../shared/StyledTextArea';
import { CommentReplyFormContainer } from '../../shared/CommentReplyFormContainer';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { SendButton } from '../../shared/SendButton';
import { regularTextSize } from '../../../constants';
import { Wrapper } from './styles';

type ReplyFormProps = {
  commentUserHandle: string;
  commentUserId: string;
  postId: string;
  commentId: string;
  postUserId: string;
};

export const ReplyForm: React.FC<ReplyFormProps> = ({
  commentUserHandle,
  postId,
  commentUserId,
  commentId,
  postUserId
}) => {
  const db = firebase.firestore();
  const alert = useAlert();

  const repliesState = useRepliesState();
  const repliesDispatch = useRepliesDispatch();
  const { userHandle, userId } = useUserState();
  const [replyBody, setReplyBody] = useState('');

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyBody(e.target.value);
  };

  const onReplySubmit = async () => {
    if (replyBody) {
      const replyInput = replyBody;
      setReplyBody('');

      const newReplyId = uuid();
      const newReply = {
        body: replyInput,
        createdAt: new Date().toISOString(),
        id: newReplyId,
        userId
      };

      repliesDispatch({ type: 'INCREMENT_NUM_REPLIES' });

      repliesDispatch({
        type: 'ADD_REPLY',
        payload: {
          ...newReply,
          userHandle
        }
      });

      if (!repliesState.showReplies)
        repliesDispatch({
          type: 'ADD_LOCAL_REPLY',
          payload: {
            ...newReply,
            userHandle
          }
        });

      repliesDispatch({ type: 'SET_POSTING_REPLY', payload: true });

      try {
        await db
          .doc(`users/${postUserId}/posts/${postId}/comments/${commentId}`)
          .collection('replies')
          .doc(newReplyId)
          .set(newReply);

        if (userId !== commentUserId) {
          const notifId = uuid();
          await db
            .doc(`users/${commentUserId}`)
            .collection('notifications')
            .doc(notifId)
            .set({
              userId,
              message: 'replied to your comment.',
              createdAt: new Date().toISOString()
            });
        }
      } catch (err) {
        alert.error('We were unable to post your reply to the database');
      }

      repliesDispatch({ type: 'SET_POSTING_REPLY', payload: false });
    }
  };

  return (
    <Wrapper>
      <OpacityLoader
        loading={repliesState.postingReply ? 1 : 0}
        defaultOpacity={1}
      >
        <Text size={regularTextSize} weight={700}>
          {userHandle}
        </Text>
        <CommentReplyFormContainer>
          <StyledTextArea
            maxLength={1500}
            maxRows={5}
            value={replyBody}
            onChange={onTextAreaChanged}
            placeholder={`Replying to ${commentUserHandle}`}
            required
          />
          <SendButton
            onClick={onReplySubmit}
            disabled={repliesState.postingReply}
          />
        </CommentReplyFormContainer>
      </OpacityLoader>
    </Wrapper>
  );
};
