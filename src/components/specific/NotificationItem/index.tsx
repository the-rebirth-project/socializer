import React from 'react';
import moment from 'moment';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { Text } from '../../shared/Text';
import { LinkText } from '../../shared/LinkText';
import { Notification } from '../../../types/Notification';
import { Wrapper, ContentWrapper } from './styles';

type NotificationItemProps = {
  notification: Notification;
  lastNotif?: boolean;
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  lastNotif
}) => {
  return (
    <Wrapper lastNotif={lastNotif}>
      <CircleAvatar imgUrl={notification.userProfile} />
      <ContentWrapper>
        <Text size={1.6} weight={400}>
          <Text size={1.6} weight={700}>
            <LinkText to={`/users/${notification.userHandle}`}>
              {notification.userHandle}
            </LinkText>
          </Text>{' '}
          {notification.message}
        </Text>
        <Text size={1.4} weight={400} opacity={0.5}>
          {moment(notification.createdAt)
            .local()
            .fromNow()}
        </Text>
      </ContentWrapper>
    </Wrapper>
  );
};
