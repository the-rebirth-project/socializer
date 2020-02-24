import React, { useState } from 'react';
import { Wrapper, TextArea } from './styles';

export const ReplyForm: React.FC = () => {
  const [replyBody, setReplyBody] = useState('');

  const onTextAreaChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyBody(e.target.value);
  };

  return (
    <Wrapper>
      <TextArea
        maxLength={1500}
        maxRows={5}
        value={replyBody}
        onChange={onTextAreaChanged}
        // TODO: Substitute 'username here' for the userHandle you're replying to
        placeholder={`Replying to username here`}
        required
      />
    </Wrapper>
  );
};
