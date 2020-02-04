import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'firebase/auth';
import { RouteComponentProps } from '@reach/router';
import { API_URL } from '../../constants/apiUrl';
import { GlobalStyles } from './styles';

export const HomeView: React.FC<RouteComponentProps> = () => {
  const [allPosts, setAllPosts] = useState<
    {
      userHandle: string;
      body: string;
      createdAt: string;
    }[]
  >();

  const getPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setAllPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <GlobalStyles />
      {allPosts?.map(p => p.body)}
    </div>
  );
};
