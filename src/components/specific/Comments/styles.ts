import styled from 'styled-components';

export const Wrapper = styled.section`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  row-gap: 0.7rem;
  width: 100%;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-word;
  width: 100%;
  line-height: 2rem;
`;
