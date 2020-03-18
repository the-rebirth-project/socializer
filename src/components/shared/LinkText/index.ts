import styled from 'styled-components';
import { Link } from '@reach/router';

interface LinkTextProps {
  /**
   * Indicates whether or not the link should be highlighted in blue
   */
  highlight?: boolean;
}

export const LinkText = styled(Link)<LinkTextProps>`
  cursor: pointer;
  font-size: inherit;
  color: ${props =>
    props.highlight ? props.theme.colors.secondary : 'inherit'};
  font-family: inherit;
  transition: all 0.1s ease-in-out;
  text-decoration: none;
`;
