import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    overflow-x: hidden;
    background-color: ${props => props.theme.colors.background};
    line-height: 1.35;

    p {
      line-height: 1.45;
    }
    
  }
`;

export const ContentWrapper = styled.main`
  width: 100vw;
  height: fit-content;
  display: flex;
  justify-content: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 4rem;
  grid-template-columns: 34rem;
`;
