import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: fit-content;
  display: flex;
  justify-content: center;
`;

export const GridContainer = styled.main`
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 4rem;
  grid-template-columns: 32rem;
`;
