import styled from 'styled-components';
import { navbarHeight } from '../../../constants/navbarHeight';

export const Page = styled.div`
  /* Provides scrolling mechanism */
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  padding: ${navbarHeight * 2}rem 0rem;
`;
