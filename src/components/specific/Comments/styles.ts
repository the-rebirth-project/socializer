import styled from 'styled-components';
import { scrollbarStyles } from '../../../constants/scrollbarStyles';

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

  ${scrollbarStyles};
`;
