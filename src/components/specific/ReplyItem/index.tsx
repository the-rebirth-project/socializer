import React from 'react';
import moment from 'moment';
import { useRepliesState } from '../../../contexts/RepliesContext';
import { CommentReplyWrapper } from '../../shared/CommentReplyWrapper/';
import { OpacityLoader } from '../../shared/OpacityLoader';
import { Text } from '../../shared/Text';
import { LinkText } from '../../shared/LinkText';
import { regularTextSize } from '../../../constants';
import { Reply } from '../../../types';

type ReplyItemProps = {
  reply: Reply;
  isFirstReply: boolean;
};
export const ReplyItem: React.FC<ReplyItemProps> = ({
  reply,
  isFirstReply
}) => {
  const { postingReply } = useRepliesState();
  const loading = isFirstReply && postingReply;

  return (
    <CommentReplyWrapper>
      <OpacityLoader loading={loading ? 1 : 0} defaultOpacity={1}>
        <Text size={regularTextSize} weight={700}>
          <LinkText to={`/users/${reply.userHandle}`}>
            {reply.userHandle}
          </LinkText>
        </Text>
      </OpacityLoader>

      <OpacityLoader loading={loading ? 1 : 0} defaultOpacity={1}>
        <Text size={regularTextSize}>{reply.body}</Text>
      </OpacityLoader>

      <Text size={1.2} opacity={0.7}>
        {moment(reply.createdAt)
          .local()
          .fromNow()}
      </Text>
    </CommentReplyWrapper>
  );
};
