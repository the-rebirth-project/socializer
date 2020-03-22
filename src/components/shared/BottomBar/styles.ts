import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { navbarHeight } from '../../../constants/navbarHeight';
import { device } from '../../../utils/responsive';

export const Wrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${navbarHeight}rem;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0px -5px 9px ${props => props.theme.colors.background}40;
  padding: 0rem 2rem;
  transform: translateY(0%);
  transition: all 0.3s ease-in-out;

  @media ${device.tablet} {
    transform: translateY(100%);
  }
`;

export const NavIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  opacity: inherit;
  transition: all 0.2s ease-in-out;
  color: ${props => props.theme.colors.textColor};
`;
