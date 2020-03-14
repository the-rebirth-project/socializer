import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { UserProfileProvider } from '../../contexts/UserProfileContext';
import { PostsProvider } from '../../contexts/PostsContext';
import { UserInfo } from '../../components/specific/UserInfo';

type RouteParams = {
  userHandle: string;
};

export const UserView: React.FC<RouteComponentProps<RouteParams>> = ({
  userHandle
}) => {
  return (
    <UserProfileProvider>
      <PostsProvider>
        <UserInfo userHandle={userHandle} />
      </PostsProvider>
    </UserProfileProvider>
  );
};
