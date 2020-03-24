import styled from 'styled-components';
import { navbarHeight } from '../../../constants/navbarHeight';
import { device } from '../../../utils/responsive';

export const Page = styled.div`
  /* Provides scrolling mechanism */
  overflow-y: auto;
  width: 100vw;
  height: 100vh;
  padding: ${navbarHeight * 2}rem 0rem;

  @media ${device.laptop} {
    padding-top: ${navbarHeight * 2}rem;
    padding-bottom: 4rem;
  }
`;
