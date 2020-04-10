import React, { useState, useEffect, useCallback } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useAlert } from 'react-alert';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { LoadingSpinner } from '../../components/shared/LoadingSpinner';
import { UsersList } from '../../components/specific/UsersList';
import { SubHeading } from '../../components/shared/SubHeading';
import { Page } from '../../components/shared/Page';
import { User } from '../../types/User';
import { Wrapper } from './styles';

export const ExploreView: React.FC<RouteComponentProps> = () => {
  const db = firebase.firestore();
  const alert = useAlert();
  const [fetchingUsers, setFetchingUsers] = useState(true);
  const [initialUsers, setInitialUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async (): Promise<void> => {
    try {
      const usersCollection = await db
        .collection('users')
        .orderBy('createdAt', 'desc')
        .limit(30)
        .get();

      const usersData: User[] = usersCollection.docs.map((d) => {
        return {
          userId: d.id,
          userHandle: d.data().userHandle,
          profileImageURL: d.data().profileImageURL,
        };
      });

      setInitialUsers(usersData);
    } catch (err) {
      alert.error(`Couldn't fetch users`);
    }

    setFetchingUsers(false);
  }, [db, alert]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Page>
      <LoadingSpinner loading={fetchingUsers ? 1 : 0} centerSpinner>
        <Wrapper>
          <SubHeading>Recent Users</SubHeading>
          <UsersList initialUsers={initialUsers} />
        </Wrapper>
      </LoadingSpinner>
    </Page>
  );
};
