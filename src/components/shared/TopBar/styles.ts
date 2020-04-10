import styled from 'styled-components';
import { navbarHeight } from '../../../constants/navbarHeight';

export const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: ${navbarHeight}rem;
  background-image: linear-gradient(
    to right,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.secondary}
  );

  box-shadow: 0px 3px 6px ${(props) => props.theme.colors.primary}40;
`;

export const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2rem;
`;

export const TitleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
