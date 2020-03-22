import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Notifications } from '../../components/specific/Notifications';
import { Page } from '../../components/shared/Page';

export const NotificationsView: React.FC<RouteComponentProps> = () => {
  return (
    <Page>
      <Notifications />
    </Page>
  );
};
