import React, { useState, useEffect, useRef, useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAlert } from 'react-alert';
import { UsersListItem } from '../UsersListItem';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { User } from '../../../types/User';
import { Wrapper, LastUserListItemWrapper } from './styles';

type UsersListProps = {
  initialUsers: User[];
};

export const UsersList: React.FC<UsersListProps> = ({ initialUsers }) => {
  const db = firebase.firestore();
  const alert = useAlert();

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [fetchingMoreUsers, setFetchingMoreUsers] = useState(false);
  const [maxUsersFetched, setMaxUsersFetched] = useState(false);
  const [lastVisibleUserId, setLastVisibleUserId] = useState('');

  useEffect(() => {
    setLastVisibleUserId(initialUsers[initialUsers.length - 1].userId);
  }, [initialUsers]);

  const mapToUsers = useCallback(
    (
      docs: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >[]
    ) => {
      const newUsers: User[] = docs.map((d) => {
        return {
          userId: d.id,
          userHandle: d.data()?.userHandle,
          profileImageURL: d.data()?.profileImageURL,
        };
      });

      setUsers([...users, ...newUsers]);
    },
    [users]
  );

  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastUserRef = useCallback(
    (node: HTMLDivElement) => {
      if (fetchingMoreUsers || maxUsersFetched) return;
      // disconnect if already connected
      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        // if the last element is in the viewport
        if (entries[0].isIntersecting && !lastVisibleUserId) {
          try {
            setFetchingMoreUsers(true);
            const snap = await db
              .collection('users')
              .orderBy('createdAt', 'desc')
              .startAfter(lastVisibleUserId)
              .limit(15)
              .get();

            if (snap.docs.length > 0) {
              setLastVisibleUserId(snap.docs[snap.docs.length - 1].id);
              mapToUsers(snap.docs);
            } else {
              setMaxUsersFetched(true);
            }
          } catch (err) {
            alert.error(`Couldn't fetch more users`);
          }

          setFetchingMoreUsers(false);
        }
      });

      // if we have a valid node, observe it
      if (node) observer.current.observe(node);
    },
    [
      db,
      alert,
      fetchingMoreUsers,
      lastVisibleUserId,
      mapToUsers,
      maxUsersFetched,
    ]
  );

  return (
    <Wrapper>
      {users.map((user, i) => {
        return i === users.length - 1 ? (
          <LastUserListItemWrapper ref={lastUserRef}>
            <UsersListItem key={user.userId} user={user} />
          </LastUserListItemWrapper>
        ) : (
          <UsersListItem key={user.userId} user={user} />
        );
      })}
      <LoadingSpinner loading={fetchingMoreUsers ? 1 : 0} small />
    </Wrapper>
  );
};
