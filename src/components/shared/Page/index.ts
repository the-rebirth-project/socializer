import styled from 'styled-components';
import { navbarHeight } from '../../../constants/navbarHeight';

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: ${navbarHeight * 2}rem;
  padding-bottom: 2rem;
  overflow-y: auto;
`;
