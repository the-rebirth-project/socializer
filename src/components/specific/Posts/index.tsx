import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../../constants/apiUrl';
import {
  usePostsState,
  usePostsDispatch
} from '../../../contexts/PostsContext';
import { PostItem } from '../PostItem';
import { Post } from '../../../types/Post';
import { Wrapper } from './styles';

// A posts component which will render an individual PostItem comprising of the post body, comments, replies, etc
// We'll use react contexts here instead of just prop drilling as we'll have multiple nested components requiring the same post data

export const Posts: React.FC = () => {
  const state = usePostsState();
  const dispatch = usePostsDispatch();

  const getPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      const postsData: Post[] = response.data;
      console.log(postsData);
      dispatch({ type: 'SET_POSTS', payload: postsData });
    } catch (err) {
      console.error(err);
    }
  };
  const memoizedGetPosts = useCallback(getPosts, []);

  useEffect(() => {
    memoizedGetPosts();
  }, [memoizedGetPosts]);

  return (
    <Wrapper>
      {state.posts.map(p => (
        <PostItem post={p} key={p.postId} />
      ))}
    </Wrapper>
  );
};
