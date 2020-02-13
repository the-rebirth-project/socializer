import React, { useEffect } from 'react';
import { PostItem } from '../PostItem';
import { PostAdd } from '../PostAdd';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { useUserState } from '../../../contexts/UserContext';
import { TextInputProvider } from '../../../contexts/TextInputContext';
import {
  usePostsState,
  usePostsDispatch,
  getPosts
} from '../../../contexts/PostsContext';
import { Wrapper } from './styles';

// A posts component which will render an individual PostItem comprising of the post body, comments, replies, etc
// We'll use react contexts here instead of just prop drilling as we'll have multiple nested components requiring the same post data

export const Posts: React.FC = () => {
  const state = usePostsState();
  const dispatch = usePostsDispatch();
  const userState = useUserState();
  const shouldLoad = state.fetchingPosts || userState.fetchingUser;

  useEffect(() => {
    getPosts(dispatch);
  }, [dispatch]);

  return (
    <LoadingSpinner
      // load the spinner as long as we don't have a valid userHandle set
      loading={shouldLoad ? 1 : 0}
      centerSpinner
    >
      <Wrapper>
        <PostAdd />
        <TextInputProvider>
          {state.posts.map(post => (
            <PostItem post={post} key={post.postId} />
          ))}
        </TextInputProvider>
      </Wrapper>
    </LoadingSpinner>
  );
};
