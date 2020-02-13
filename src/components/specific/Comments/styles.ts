import styled from 'styled-components';

export const Wrapper = styled.section`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  row-gap: 0.7rem;
  width: 100%;
`;

export const CommentsContainer = styled.main`
  width: 100%;
  overflow-y: auto;
  display: block;
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 1.3rem;
  max-height: 30rem;
  padding-right: 1rem;

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: ${props => props.theme.colors.textColor};
  }
`;
