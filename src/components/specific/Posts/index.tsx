import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { PostItem } from '../PostItem';
import { PostAdd } from '../PostAdd';
import { LoadingSpinner } from '../../shared/LoadingSpinner';
import { API_URL } from '../../../constants/apiUrl';
import {
  usePostsState,
  usePostsDispatch
} from '../../../contexts/PostsContext';
import { Post } from '../../../types/Post';
import { Wrapper } from './styles';

// A posts component which will render an individual PostItem comprising of the post body, comments, replies, etc
// We'll use react contexts here instead of just prop drilling as we'll have multiple nested components requiring the same post data

export const Posts: React.FC = () => {
  const state = usePostsState();
  const dispatch = usePostsDispatch();
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      const postsData: Post[] = response.data;
      dispatch({ type: 'SET_POSTS', payload: postsData });
    } catch (err) {
      console.error(err);
    }
  };
  const memoizedGetPosts = useCallback(getPosts, []);

  useEffect(() => {
    const asyncFetch = async () => {
      setLoading(true);
      await memoizedGetPosts();
      setLoading(false);
    };
    asyncFetch();
  }, [memoizedGetPosts]);

  return (
    <LoadingSpinner loading={loading} alignCenter>
      <Wrapper>
        <PostAdd />
        {state.posts.map(p => (
          <PostItem post={p} key={p.postId} />
        ))}
      </Wrapper>
    </LoadingSpinner>
  );
};
