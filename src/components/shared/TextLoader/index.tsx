import React from 'react';
import { Wrapper } from './styles';

interface TextLoaderProps {
  loading: boolean;
  fontSize?: number;
}

export const TextLoader: React.FC<TextLoaderProps> = ({
  children,
  loading,
  fontSize
}) => {
  return (
    <div>{loading && <Wrapper fontSize={fontSize}>{children}</Wrapper>}</div>
  );
};
