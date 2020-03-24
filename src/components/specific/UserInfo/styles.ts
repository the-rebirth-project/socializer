import styled from 'styled-components';
import { navbarHeight } from '../../../constants/navbarHeight';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  justify-items: center;
  row-gap: 2rem;
  width: 90%;
  margin: 0 auto;
  margin-top: -${navbarHeight}rem;
`;
