import React, { useState, useEffect, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { PostAdd } from '../PostAdd';
import { PostItem } from '../../shared/PostItem';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { useUserState } from '../../../contexts/UserContext';
import {
  usePostsState,
  usePostsDispatch,
} from '../../../contexts/PostsContext';
import { useMounted } from '../../../hooks/useMounted';
import { Post } from '../../../types';
import { Wrapper } from './styles';

export const Posts: React.FC = () => {
  const db = firebase.firestore();
  const state = usePostsState();
  const isMounted = useMounted();
  const userState = useUserState();
  const dispatch = usePostsDispatch();
  const shouldLoad = userState.fetchingUser || state.fetchingPosts;
  // how many posts to fetch on each query
  const postsLimit = 15;
  const [maxPostsFetched, setMaxPostsFetched] = useState(false);
  const [lastVisiblePost, setLastVisiblePost] = useState<
    firebase.firestore.DocumentData | undefined
  >(undefined);
  const [fetchingMorePosts, setFetchingMorePosts] = useState(false);

  const mapToPosts = useCallback(
    async (
      docs: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >[]
    ) => {
      const docDataPromises: Promise<any>[] = docs.map(async (doc) => {
        const commentsCollection = await db
          .doc(`users/${userState.userId}/feed/${doc.id}`)
          .collection('comments')
          .orderBy('createdAt', 'desc')
          .get();

        const commentsDataPromises = commentsCollection.docs.map(async (d) => {
          const userDoc = await db
            .collection('users')
            .doc(d.data().userId)
            .get();
          return {
            id: d.id,
            ...d.data(),
            userHandle: userDoc.exists
              ? userDoc.data()?.userHandle
              : '[deleted user]',
          };
        });

        const commentsData = await Promise.all(commentsDataPromises);

        const seedDoc = await db
          .doc(`users/${userState.userId}/feed/${doc.id}`)
          .collection('seeds')
          .doc(userState.userId)
          .get();

        const userDoc = await db.doc(`users/${doc.data().userId}`).get();

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
          isSeeded: seedDoc.exists,
        };
      });
      const docData: Post[] = await Promise.all(docDataPromises);

      isMounted.current && dispatch({ type: 'SET_POSTS', payload: docData });
    },
    [db, dispatch, userState.userId, isMounted]
  );

  // get initial posts
  const getPosts = async () => {
    if (!userState.fetchingUser && userState.userHandle) {
      isMounted.current &&
        dispatch({ type: 'SET_FETCHING_POSTS', payload: true });
      try {
        const snap = await db
          .doc(`users/${userState.userId}`)
          .collection('feed')
          .orderBy('createdAt', 'desc')
          .limit(postsLimit)
          .get();

        isMounted.current &&
          setLastVisiblePost(snap.docs[snap.docs.length - 1]);
        await mapToPosts(snap.docs);
      } catch (err) {
        // TODO: Handle error
        console.log(err);
      }

      isMounted.current &&
        dispatch({ type: 'SET_FETCHING_POSTS', payload: false });
    }
  };

  const memoizedGetPosts = useCallback(getPosts, [
    userState.fetchingUser,
    isMounted,
  ]);

  useEffect(() => {
    dispatch({ type: 'RESET_POSTS' });
    memoizedGetPosts();
  }, [memoizedGetPosts, dispatch]);

  // we want this value to persist (not change) on every render hence we use the useRef hook
  const observer = useRef<IntersectionObserver | undefined>();
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (fetchingMorePosts || maxPostsFetched) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        if (entries[0].isIntersecting && !maxPostsFetched && lastVisiblePost) {
          // try appending more posts
          try {
            isMounted.current && setFetchingMorePosts(true);
            const snap = await db
              .doc(`users/${userState.userId}`)
              .collection('feed')
              .orderBy('createdAt', 'desc')
              .startAfter(lastVisiblePost)
              .limit(postsLimit)
              .get();

            // if we get no docs, then stop querying further
            if (snap.docs.length > 0) {
              isMounted.current &&
                setLastVisiblePost(snap.docs[snap.docs.length - 1]);
              await mapToPosts(snap.docs);
            } else {
              isMounted.current && setMaxPostsFetched(true);
            }
          } catch (err) {
            console.log(err);
          }

          isMounted.current && setFetchingMorePosts(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      isMounted,
      fetchingMorePosts,
      maxPostsFetched,
      db,
      lastVisiblePost,
      mapToPosts,
      userState.userId,
    ]
  );

  return (
    <LoadingSpinner
      // load the spinner as long as we don't have a valid userHandle set
      loading={shouldLoad ? 1 : 0}
      centerSpinner
    >
      <Wrapper>
        <PostAdd />
        {state.posts.map((post, index) => {
          if (index === state.posts.length - 1) {
            return (
              <div ref={lastPostRef} key={post.postId}>
                <PostItem
                  post={post}
                  key={post.postId}
                  isAddingPost={state.addingPost && index === 0}
                />
              </div>
            );
          } else {
            return (
              <PostItem
                post={post}
                key={post.postId}
                isAddingPost={state.addingPost && index === 0}
              />
            );
          }
        })}
        <div style={{ justifySelf: 'center' }}>
          <LoadingSpinner
            loading={fetchingMorePosts ? 1 : 0}
            small
          ></LoadingSpinner>
        </div>
      </Wrapper>
    </LoadingSpinner>
  );
};
