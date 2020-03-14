import React, { useState } from 'react';
import uuid from 'uuid/v4';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  useRepliesState,
  useRepliesDispatch
} from '../../../contexts/RepliesContext';
import { useUserState } from '../../../contexts/UserContext';
import { Text } from '../../shared/Text';
import { CommentReplyTextArea } from '../../shared/CommentReplyTextArea';
import { CommentReplyFormContainer } from '../../shared/CommentReplyFormContainer';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { SendButton } from '../../shared/SendButton';
import { regularTextSize } from '../../../constants';
import { Reply } from '../../../types';
import { Wrapper } from './styles';

type ReplyFormProps = {
  commentUserHandle: string;
  postId: string;
  commentId: string;
  postUserHandle: string;
};

export const ReplyForm: React.FC<ReplyFormProps> = ({
  commentUserHandle,
  postId,
  commentId,
  postUserHandle
}) => {
  const db = firebase.firestore();
  const repliesState = useRepliesState();
  const repliesDispatch = useRepliesDispatch();
  const { userHandle } = useUserState();
  const [replyBody, setReplyBody] = useState('');

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyBody(e.target.value);
  };

  const onReplySubmit = async () => {
    if (replyBody) {
      const replyInput = replyBody;
      setReplyBody('');

      const newReplyId = uuid();
      const newReply: Reply = {
        body: replyInput,
        createdAt: new Date().toISOString(),
        id: newReplyId,
        userHandle
      };

      repliesDispatch({ type: 'ADD_REPLY', payload: newReply });

      if (!repliesState.showReplies)
        repliesDispatch({ type: 'ADD_LOCAL_REPLY', payload: newReply });

      repliesDispatch({ type: 'SET_POSTING_REPLY', payload: true });

      try {
        await db
          .doc(`users/${postUserHandle}/posts/${postId}/comments/${commentId}`)
          .collection('replies')
          .doc(newReplyId)
          .set(newReply);
      } catch (err) {
        // TODO: Handle error
        console.log(err);
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
          <CommentReplyTextArea
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
