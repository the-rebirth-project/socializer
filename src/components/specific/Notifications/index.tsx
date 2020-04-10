import React, { useState, useEffect, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAlert } from 'react-alert';
import { useMounted } from '../../../hooks/useMounted';
import { useUserState } from '../../../contexts/UserContext';
import { NotificationItem } from '../NotificationItem';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { SubHeading } from '../../shared/SubHeading';
import { Notification } from '../../../types/Notification';
import { Wrapper, NotificationsWrapper } from './styles';

export const Notifications = () => {
  const db = firebase.firestore();
  const alert = useAlert();
  const isMounted = useMounted();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fetchingNotifs, setFetchingNotifs] = useState(false);
  const [fetchingMoreNotifs, setFetchingMoreNotifs] = useState(false);
  const [maxNotifsFetched, setMaxNotifsFetched] = useState(false);
  const [lastVisible, setLastVisible] = useState<
    firebase.firestore.DocumentData | undefined
  >(undefined);
  const userState = useUserState();
  const shouldLoad = userState.fetchingUser || fetchingNotifs;

  const mapToNotifs = useCallback(
    async (
      docs: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >[]
    ) => {
      const notifDataPromises: Promise<Notification>[] = docs.map(async (n) => {
        const userDoc = await db.doc(`users/${n.data().userId}`).get();

        return {
          id: n.id,
          userHandle: userDoc.data()
            ? userDoc.data()?.userHandle
            : '[deleted user]',
          userProfile: userDoc.data()?.profileImageURL,
          message: n.data().message,
          createdAt: n.data().createdAt,
        };
      });

      const notifData = await Promise.all(notifDataPromises);
      isMounted.current && setNotifications([...notifications, ...notifData]);
    },
    // eslint-disable-next-line
    []
  );

  // fetch initial notifications
  const getNotifications = useCallback(async () => {
    isMounted.current && setFetchingNotifs(true);
    if (userState.userId) {
      try {
        const snap = await db
          .collection('users')
          .doc(userState.userId)
          .collection('notifications')
          .orderBy('createdAt', 'desc')
          .limit(15)
          .get();

        if (snap.docs.length > 0)
          setLastVisible(snap.docs[snap.docs.length - 1]);

        await mapToNotifs(snap.docs);
      } catch (err) {
        alert.error(`Couldn't fetch notifications`);
      }

      isMounted.current && setFetchingNotifs(false);
    }
  }, [alert, db, userState.userId, isMounted, mapToNotifs]);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const observer = useRef<IntersectionObserver | undefined>(undefined);
  const lastNotifRef = useCallback(
    (node: HTMLDivElement) => {
      if (fetchingMoreNotifs || maxNotifsFetched) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && !maxNotifsFetched && lastVisible) {
          try {
            isMounted.current && setFetchingMoreNotifs(true);
            const snap = await db
              .doc(`users/${userState.userId}`)
              .collection('notifications')
              .get();

            if (snap.docs.length > 0) {
              isMounted.current &&
                setLastVisible(snap.docs[snap.docs.length - 1]);
              await mapToNotifs(snap.docs);
            } else {
              isMounted.current && setMaxNotifsFetched(true);
            }
          } catch (err) {
            alert.error(`Couldn't fetch more notifications`);
          }
        }
      });
    },
    [
      alert,
      db,
      fetchingMoreNotifs,
      isMounted,
      lastVisible,
      maxNotifsFetched,
      mapToNotifs,
      userState.userId,
    ]
  );

  return (
    <LoadingSpinner loading={shouldLoad ? 1 : 0} centerSpinner>
      <Wrapper>
        <SubHeading>Notifications</SubHeading>
        {/* Last notification will get the ref */}
        <NotificationsWrapper>
          {notifications.map((n, i) => {
            if (i === notifications.length - 1) {
              return (
                <div ref={lastNotifRef} key={n.id}>
                  <NotificationItem notification={n} />
                </div>
              );
            } else {
              return <NotificationItem key={n.id} notification={n} />;
            }
          })}
        </NotificationsWrapper>
      </Wrapper>
      <LoadingSpinner loading={fetchingMoreNotifs ? 1 : 0} small />
    </LoadingSpinner>
  );
};
