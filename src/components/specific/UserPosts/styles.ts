import styled from 'styled-components';
import { device } from '../../../utils/responsive';

export const Wrapper = styled.main`
  display: grid;
  grid-template-rows: min-content;
  grid-template-columns: 100%;
  width: 90%;
  row-gap: 4rem;
  justify-content: center;

  @media ${device.tablet} {
    width: auto;
    grid-template-columns: 34rem;
  }
`;
