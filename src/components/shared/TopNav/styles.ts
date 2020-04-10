import styled from 'styled-components';
import { device } from '../../../utils/responsive';

export const Wrapper = styled.nav`
  display: none; /* do not display by default */

  @media ${device.tablet} {
    display: flex;
    align-items: center;
    height: 100%;
    width: 15%;
    justify-content: space-between;
  }
`;
