import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavIcon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  opacity: inherit;
  transition: all 0.3s ease-in-out;
  color: ${(props) => props.theme.colors.textColor};
`;
