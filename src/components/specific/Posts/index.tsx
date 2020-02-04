import React from 'react';
import { Wrapper } from './styles';

// A posts component which will render an individual PostItem comprising of the post body, comments, replies, etc
// We'll use react contexts here instead of just prop drilling as we'll have multiple nested components requiring the same post data

export const Posts: React.FC = () => {
  return <Wrapper></Wrapper>;
};
