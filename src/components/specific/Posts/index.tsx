import React, { useState, useEffect, useCallback, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { PostItem } from '../../shared/PostItem';
import { PostAdd } from '../PostAdd';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { useUserState } from '../../../contexts/UserContext';
import {
  usePostsState,
  usePostsDispatch
} from '../../../contexts/PostsContext';
import { Post } from '../../../types';
import { Wrapper } from './styles';

export const Posts: React.FC = () => {
  const db = firebase.firestore();
  const state = usePostsState();
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
      const docDataPromises: Promise<any>[] = docs.map(async doc => {
        const commentsCollection = await db
          .doc(`users/${userState.userHandle}/feed/${doc.id}`)
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
          .doc(`users/${userState.userHandle}/feed/${doc.id}`)
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

      dispatch({ type: 'SET_POSTS', payload: docData });
    },
    [db, dispatch, userState.userHandle]
  );

  // get initial posts
  const getPosts = async () => {
    if (!userState.fetchingUser && userState.userHandle) {
      dispatch({ type: 'SET_FETCHING_POSTS', payload: true });
      try {
        const querySnapshot = await db
          .doc(`users/${userState.userHandle}`)
          .collection('feed')
          .orderBy('createdAt', 'desc')
          .limit(postsLimit)
          .get();

        setLastVisiblePost(querySnapshot.docs[querySnapshot.docs.length - 1]);
        await mapToPosts(querySnapshot.docs);
      } catch (err) {
        // TODO: Handle error
        console.log(err);
      }

      dispatch({ type: 'SET_FETCHING_POSTS', payload: false });
    }
  };

  const memoizedGetPosts = useCallback(getPosts, [userState.fetchingUser]);

  useEffect(() => {
    memoizedGetPosts();
  }, [memoizedGetPosts, userState.fetchingUser]);

  // we want this value to persist (not change) on every render hence we use the useRef hook
  const observer = useRef<IntersectionObserver | undefined>();
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (fetchingMorePosts || maxPostsFetched) return;
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver(async entries => {
        if (entries[0].isIntersecting && !maxPostsFetched && lastVisiblePost) {
          // append more posts
          setFetchingMorePosts(true);
          const querySnapshot = await db
            .doc(`users/${userState.userHandle}`)
            .collection('feed')
            .orderBy('createdAt', 'desc')
            .startAfter(lastVisiblePost)
            .limit(postsLimit)
            .get();

          // if we get no docs, then stop querying further
          if (querySnapshot.docs.length > 0) {
            setLastVisiblePost(
              querySnapshot.docs[querySnapshot.docs.length - 1]
            );
            await mapToPosts(querySnapshot.docs);
          } else {
            setMaxPostsFetched(true);
          }

          setFetchingMorePosts(false);
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      fetchingMorePosts,
      maxPostsFetched,
      db,
      lastVisiblePost,
      mapToPosts,
      userState.userHandle
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
      </Wrapper>
      <LoadingSpinner
        loading={fetchingMorePosts ? 1 : 0}
        small
      ></LoadingSpinner>
    </LoadingSpinner>
  );
};
