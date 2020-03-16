import React from 'react';
import { Wrapper } from './styles';

interface TextLoaderProps {
  loading: boolean;
}

export const TextLoader: React.FC<TextLoaderProps> = ({
  children,
  loading
}) => {
  return <div>{loading && <Wrapper>{children}</Wrapper>}</div>;
};
