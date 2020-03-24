import React, { useState, useEffect, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAlert } from 'react-alert';
import { useUserState } from '../../../contexts/UserContext';
import { useUserProfileState } from '../../../contexts/UserProfileContext';
import {
  usePostsState,
  usePostsDispatch
} from '../../../contexts/PostsContext';
import { useMounted } from '../../../hooks/useMounted';
import { PostItem } from '../../shared/PostItem';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { Post } from '../../../types';
import { Wrapper } from './styles';

export const UserPosts: React.FC = () => {
  const db = firebase.firestore();
  const alert = useAlert();
  const isMounted = useMounted();
  const userState = useUserState();
  const postsState = usePostsState();
  const postsDispatch = usePostsDispatch();
  const { userData, fetchingData } = useUserProfileState();
  const [lastVisiblePost, setLastVisiblePost] = useState<
    firebase.firestore.DocumentData | undefined
  >(undefined);
  const [fetchingMorePosts, setFetchingMorePosts] = useState(false);
  const [maxPostsFetched, setMaxPostsFetched] = useState(false);

  const mapToPosts = useCallback(
    async (
      docs: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >[]
    ) => {
      const docDataPromises: Promise<any>[] = docs.map(async doc => {
        const commentsCollection = await db
          .doc(`users/${userData.userId}`)
          .collection('posts')
          .doc(doc.id)
          .collection('comments')
          .orderBy('createdAt', 'desc')
          .get();

        const commentsDataPromises = commentsCollection.docs.map(async d => {
          const userDoc = await db
            .collection('users')
            .doc(d.data().userId)
            .get();
          return {
            id: d.id,
            ...d.data(),
            userHandle: userDoc.exists
              ? userDoc.data()?.userHandle
              : '[deleted user]'
          };
        });

        const commentsData = await Promise.all(commentsDataPromises);

        const seedDoc = await db
          .doc(`users/${userData.userId}/posts/${doc.id}`)
          .collection('seeds')
          .doc(userState.userId)
          .get();

        const userDoc = await db
          .collection('users')
          .doc(doc.data().userId)
          .get();

        return {
          postId: doc.id,
          ...doc.data(),
          userHandle: userDoc.exists
            ? userDoc.data()?.userHandle
            : '[deleted user]',
          userProfile: userDoc.exists
            ? userDoc.data()?.profileImageURL
            : doc.data().userProfile,
          comments: commentsData,
          isSeeded: seedDoc.exists
        };
      });

      const docData: Post[] = await Promise.all(docDataPromises);

      isMounted.current &&
        postsDispatch({ type: 'SET_POSTS', payload: docData });
    },
    [db, postsDispatch, userState.userId, userData.userId, isMounted]
  );

  const getUserPosts = async () => {
    isMounted.current && postsDispatch({ type: 'RESET_POSTS' });
    if (userData.userId) {
      try {
        isMounted.current &&
          postsDispatch({ type: 'SET_FETCHING_POSTS', payload: true });
        const snap = await db
          .doc(`users/${userData.userId}`)
          .collection('posts')
          .orderBy('createdAt', 'desc')
          .limit(5)
          .get();

        isMounted.current &&
          setLastVisiblePost(snap.docs[snap.docs.length - 1]);
        await mapToPosts(snap.docs);
      } catch (err) {
        alert.error(`Couldn't fetch posts`);
      }
      isMounted.current &&
        postsDispatch({ type: 'SET_FETCHING_POSTS', payload: false });
    }
  };

  const memoizedGetUserPosts = useCallback(getUserPosts, [fetchingData]);

  useEffect(() => {
    memoizedGetUserPosts();
  }, [memoizedGetUserPosts, fetchingData]);

  const observer = useRef<IntersectionObserver | undefined>();
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (fetchingMorePosts || maxPostsFetched) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(async entries => {
        if (entries[0].isIntersecting && !maxPostsFetched && lastVisiblePost) {
          try {
            isMounted.current && setFetchingMorePosts(true);
            const snap = await db
              .doc(`users/${userData.userId}`)
              .collection('posts')
              .orderBy('createdAt', 'desc')
              .startAfter(lastVisiblePost)
              .limit(15)
              .get();

            if (snap.docs.length > 0) {
              isMounted.current &&
                setLastVisiblePost(snap.docs[snap.docs.length - 1]);
              await mapToPosts(snap.docs);
            } else {
              isMounted.current && setMaxPostsFetched(true);
            }
          } catch (err) {
            alert.error(`Couldn't fetch more posts`);
          }

          isMounted.current && setFetchingMorePosts(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      db,
      alert,
      fetchingMorePosts,
      lastVisiblePost,
      maxPostsFetched,
      mapToPosts,
      userData.userId,
      isMounted
    ]
  );

  return (
    <>
      <Wrapper>
        {postsState.posts.map((post, index) => {
          if (index === postsState.posts.length - 1) {
            return (
              <div ref={lastPostRef} key={post.postId}>
                <PostItem post={post} />
              </div>
            );
          } else {
            return <PostItem post={post} key={post.postId} />;
          }
        })}
      </Wrapper>

      <LoadingSpinner
        loading={postsState.fetchingPosts || fetchingMorePosts ? 1 : 0}
        small
      ></LoadingSpinner>
    </>
  );
};
