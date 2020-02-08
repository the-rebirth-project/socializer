import React from 'react';
import { Text } from '../../shared/Text';
import { Wrapper, FlexContainer, TitleContainer } from './styles';

export const Navbar: React.FC = () => {
  return (
    <Wrapper>
      <FlexContainer>
        <TitleContainer>
          <Text size={1.8} weight={700}>
            <h1>socializer</h1>
          </Text>
        </TitleContainer>
      </FlexContainer>
    </Wrapper>
  );
};

export const NavbarBottomMargin = 8; // in rem
