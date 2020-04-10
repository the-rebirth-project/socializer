import React from 'react';
import { navigate } from '@reach/router';
import { CircleAvatar } from '../../shared/CircleAvatar';
import { Text } from '../../shared/Text';
import { User } from '../../../types/User';
import { Wrapper } from './styles';

type UsersListItemProps = {
  user: User;
};

export const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
  const onWrapperClick = () => {
    navigate(`/users/${user.userHandle}`);
  };

  return (
    <Wrapper onClick={onWrapperClick}>
      <CircleAvatar imgUrl={user.profileImageURL} sizeScaling={1.3} />

      <Text weight={700} size={1.8}>
        {user.userHandle}
      </Text>
    </Wrapper>
  );
};
