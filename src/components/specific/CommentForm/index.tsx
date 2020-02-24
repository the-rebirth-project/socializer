import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';
import { useUserState } from '../../../contexts/UserContext';
import { useCommentsDispatch } from '../../../contexts/CommentsContext';
import {
  useTextInputState,
  useTextInputDispatch
} from '../../../contexts/TextInputContext';
import { SendButton } from '../../shared/SendButton';
import { API_URL } from '../../../constants/apiUrl';
import { onGetUserIdToken } from '../../../helpers';
import { CommentMode } from '../../../types';
import { Wrapper, TextInput, InputLabel } from './styles';

type CommentFormProps = {
  postingComment: boolean;
  postId: string;
};

/* 
  This component is mostly just a lot of api calls and handling really minute state details of the UI
  It may look lengthy but I decided it was better to keep the async actions in the component itself
*/

export const CommentForm: React.FC<CommentFormProps> = ({
  postingComment,
  postId
}) => {
  const [commentText, setCommentText] = useState('');
  const textInputState = useTextInputState();
  const textInputDispatch = useTextInputDispatch();
  const { userHandle } = useUserState();
  const commentsDispatch = useCommentsDispatch();
  const isReplying = textInputState.commentMode === CommentMode.REPLY_COMMENT;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    /*
       Focus the input only if post id in context state and post id of the component overlap
       otherwise we end up focusing the wrong input
     */
    if (isReplying && textInputState.postId === postId)
      inputRef.current && inputRef.current.focus();
  }, [isReplying, postId, textInputState.postId]);

  const submitComment = () => {
    const commentId = uuid();

    commentsDispatch({
      type: 'ADD_COMMENT',
      payload: {
        id: commentId,
        userHandle,
        body: commentText,
        createdAt: new Date().toISOString(),
        numReplies: 0
      }
    });

    // onGetUserIdToken(async idToken => {
    //   try {
    //     postsDispatch({
    //       type: 'SET_POSTING_COMMENT',
    //       payload: {
    //         postId,
    //         value: true
    //       }
    //     });

    //     await axios.post(
    //       `${API_URL}/posts/add-comment`,
    //       {
    //         commentId,
    //         postId,
    //         commentBody: commentText
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${idToken}`
    //         }
    //       }
    //     );

    //     postsDispatch({
    //       type: 'SET_POSTING_COMMENT',
    //       payload: {
    //         postId,
    //         value: false
    //       }
    //     });
    //   } catch (err) {
    //     // TODO: HANDLE ERROR
    //     console.log(err);
    //   }
    // });
  };

  const submitReply = () => {
    const { commentId } = textInputState;
    const replyId = uuid();

    // postsDispatch({
    //   type: 'ADD_REPLY',
    //   payload: {
    //     replyId,
    //     commentId,
    //     postId,
    //     body: commentText,
    //     userHandle
    //   }
    // });

    // onGetUserIdToken(async idToken => {
    //   try {
    //     // disable all inputs while we're adding the reply
    //     postsDispatch({
    //       type: 'SET_POSTING_COMMENT',
    //       payload: {
    //         postId,
    //         value: true
    //       }
    //     });
    //     postsDispatch({
    //       type: 'SET_POSTING_REPLY',
    //       payload: {
    //         postId,
    //         commentId,
    //         value: true
    //       }
    //     });

    //     await axios.post(
    //       `${API_URL}/posts/comments/replies`,
    //       {
    //         replyId,
    //         commentId,
    //         postId,
    //         replyBody: commentText
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${idToken}`
    //         }
    //       }
    //     );
    //   } catch (err) {
    //     // TODO: HANDLE ERROR
    //     console.log(err);
    //   }

    //   postsDispatch({
    //     type: 'SET_POSTING_COMMENT',
    //     payload: {
    //       postId,
    //       value: false
    //     }
    //   });
    //   postsDispatch({
    //     type: 'SET_POSTING_REPLY',
    //     payload: {
    //       postId,
    //       commentId,
    //       value: false
    //     }
    //   });
    // });
  };

  const onCommentSubmit = () => {
    if (commentText) {
      if (isReplying) submitReply();
      else submitComment();
    }

    setCommentText('');
  };

  // switches mode to post comment
  const switchCommentMode = () => {
    textInputDispatch({
      type: 'SET_COMMENT_MODE',
      payload: CommentMode.POST_COMMENT
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
    if (
      e.target.value === '' &&
      textInputState.commentMode === CommentMode.REPLY_COMMENT
    )
      switchCommentMode();
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onCommentSubmit();
  };

  return (
    <Wrapper>
      <TextInput
        type='text'
        placeholder={isReplying ? 'Reply to comment' : 'Add a comment'}
        value={commentText}
        onClick={switchCommentMode}
        onChange={onInputChange}
        onKeyPress={onPressEnter}
        disabled={postingComment}
        ref={inputRef}
      />
      <InputLabel>
        {isReplying ? 'Replying to a comment' : 'Commenting on a post'}
      </InputLabel>
      <SendButton onClick={onCommentSubmit} />
    </Wrapper>
  );
};
