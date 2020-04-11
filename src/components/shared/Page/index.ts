import styled from 'styled-components';
import { navbarHeight } from '../../../constants/navbarHeight';
import { device } from '../../../utils/responsive';

export const Page = styled.div`
  width: 100vw;
  height: 100vh;
  padding: ${navbarHeight * 2}rem 0rem;
  overflow-y: auto;

  @media ${device.tablet} {
    padding-bottom: 2rem;
  }
`;
