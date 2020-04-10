import styled from 'styled-components';

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 1rem;
  align-items: center;
  min-height: 4rem;
  padding: 0rem 2rem;
  width: 100%;
  position: relative;
  justify-content: center;
  justify-items: center;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  align-items: center;
  min-height: 100%;
  width: 100%;
`;
