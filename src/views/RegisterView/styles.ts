import styled, { createGlobalStyle } from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 6.5rem 0rem;
  background-color: ${props => props.theme.colors.background};
  display: grid;
  grid-template-rows: 1fr 2.7fr 1.6fr;
  row-gap: 4rem;
  justify-content: center;
`;

export const GlobalBackground = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background};
  }
`;
