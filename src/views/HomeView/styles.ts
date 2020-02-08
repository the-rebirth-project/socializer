import styled, { createGlobalStyle } from 'styled-components';

export const Wrapper = styled.div``;
export const GlobalStyles = createGlobalStyle`
  body {
    overflow-x: hidden;
    background-color: ${props => props.theme.colors.background};
  }
`;
