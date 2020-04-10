import React from 'react';
import { TopNav } from '../TopNav';
import { Text } from '../Text';
import { Wrapper, FlexContainer, TitleContainer } from './styles';

export const TopBar: React.FC = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <Text size={1.8} weight={700}>
          <h1>socializer</h1>
        </Text>
      </TitleContainer>
      <FlexContainer>
        <TopNav />
      </FlexContainer>
    </Wrapper>
  );
};
