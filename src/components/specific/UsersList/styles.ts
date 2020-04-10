import styled from 'styled-components';
import { device } from '../../../utils/responsive';

export const Wrapper = styled.main`
  display: grid;
  grid-template-rows: auto;
  row-gap: 2rem;
  width: 100%;
  padding: 0rem 2rem;
  justify-items: center;

  @media ${device.tablet} {
    grid-template-columns: 32rem;
    width: auto;
    padding: 0rem;
  }
`;

export const LastUserListItemWrapper = styled.div`
  width: 100%;
`;
