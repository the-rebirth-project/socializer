import styled from 'styled-components';
import { device } from '../../../utils/responsive';

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 1rem;
  align-items: center;
  min-height: 4rem;
  width: 100vw;
  padding: 0rem 2rem;
  position: relative;

  @media ${device.tablet} {
    width: 100%;
    padding: 0rem;
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  align-items: center;
  min-height: 100%;
  width: 100%;
`;
