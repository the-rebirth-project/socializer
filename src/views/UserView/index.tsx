import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { UserProfileProvider } from '../../contexts/UserProfileContext';
import { PostsProvider } from '../../contexts/PostsContext';
import { UserInfo } from '../../components/specific/UserInfo';
import { Page } from '../../components/shared/Page';

type RouteParams = {
  userHandle: string;
};

export const UserView: React.FC<RouteComponentProps<RouteParams>> = ({
  userHandle,
}) => {
  return (
    <Page>
      <UserProfileProvider>
        <PostsProvider>
          <UserInfo userHandle={userHandle} />
        </PostsProvider>
      </UserProfileProvider>
    </Page>
  );
};
