import React, { useState, useEffect, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useUserState } from '../../../contexts/UserContext';
import { useUserProfileState } from '../../../contexts/UserProfileContext';
import {
  usePostsState,
  usePostsDispatch
} from '../../../contexts/PostsContext';
import { PostItem } from '../../shared/PostItem';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { Post } from '../../../types';
import { Wrapper } from './styles';

export const UserPosts: React.FC = () => {
  const db = firebase.firestore();
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
          .doc(`users/${userData.userHandle}`)
          .collection('posts')
          .doc(doc.id)
          .collection('comments')
          .orderBy('createdAt', 'desc')
          .get();

        const commentsData = commentsCollection.docs.map(d => {
          return {
            id: d.id,
            ...d.data()
          };
        });

        const seedDoc = await db
          .doc(`users/${userData.userHandle}/posts/${doc.id}`)
          .collection('seeds')
          .doc(userState.userHandle)
          .get();

        return {
          postId: doc.id,
          ...doc.data(),
          comments: commentsData,
          isSeeded: seedDoc.exists
        };
      });

      const docData: Post[] = await Promise.all(docDataPromises);

      postsDispatch({ type: 'SET_POSTS', payload: docData });
    },
    [db, userData.userHandle, userState.userHandle, postsDispatch]
  );

  const getUserPosts = async () => {
    postsDispatch({ type: 'RESET_POSTS' });
    if (userData.userHandle) {
      try {
        postsDispatch({ type: 'SET_FETCHING_POSTS', payload: true });
        const snap = await db
          .doc(`users/${userData.userHandle}`)
          .collection('posts')
          .orderBy('createdAt', 'desc')
          .limit(5)
          .get();

        setLastVisiblePost(snap.docs[snap.docs.length - 1]);
        await mapToPosts(snap.docs);
      } catch (err) {
        // TODO: Handle error
        console.log(err);
      }
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
          setFetchingMorePosts(true);
          const snap = await db
            .doc(`users/${userData.userHandle}`)
            .collection('posts')
            .orderBy('createdAt', 'desc')
            .startAfter(lastVisiblePost)
            .limit(15)
            .get();

          if (snap.docs.length > 0) {
            setLastVisiblePost(snap.docs[snap.docs.length - 1]);
            await mapToPosts(snap.docs);
          } else {
            setMaxPostsFetched(true);
          }

          setFetchingMorePosts(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      db,
      fetchingMorePosts,
      lastVisiblePost,
      maxPostsFetched,
      mapToPosts,
      userData.userHandle
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
            return <PostItem post={post} />;
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
