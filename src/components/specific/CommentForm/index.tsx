import React, { useState } from 'react';
import uuid from 'uuid/v4';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useUserState } from '../../../contexts/UserContext';
import {
  useCommentsDispatch,
  useCommentsState
} from '../../../contexts/CommentsContext';
import { SendButton } from '../../shared/SendButton';
import { Text } from '../../shared/Text';
import { CommentReplyTextArea } from '../../shared/CommentReplyTextArea';
import { CommentReplyFormContainer } from '../../shared/CommentReplyFormContainer';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Comment } from '../../../types';
import { Wrapper } from './styles';

type CommentFormProps = {
  postId: string;
  postUserHandle: string;
};

/* 
  This component is mostly just a lot of api calls and handling really minute state details of the UI
  It may look lengthy but I decided it was better to keep the async actions in the component itself
*/

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  postUserHandle
}) => {
  const db = firebase.firestore();

  const [commentText, setCommentText] = useState('');
  const { userHandle } = useUserState();
  const commentsDispatch = useCommentsDispatch();
  const commentsState = useCommentsState();

  const onCommentSubmit = async () => {
    if (commentText) {
      // pass by value
      const commentInput = commentText;
      // reset input
      setCommentText('');
      const commentId = uuid();
      const newComment: Comment = {
        id: commentId,
        userHandle,
        body: commentInput,
        createdAt: new Date().toISOString(),
        numReplies: 0
      };

      commentsDispatch({
        type: 'ADD_COMMENT',
        payload: newComment
      });

      commentsDispatch({
        type: 'SET_POSTING_COMMENT',
        payload: true
      });

      try {
        await db
          .doc(`users/${postUserHandle}/posts/${postId}`)
          .collection('comments')
          .doc(commentId)
          .set(newComment);
      } catch (err) {
        // TODO: Handle error
        console.log(err);
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
          <CommentReplyTextArea
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
