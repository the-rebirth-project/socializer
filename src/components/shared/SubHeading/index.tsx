import React from 'react';
import { Wrapper, Content } from './styles';

export const SubHeading: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};
