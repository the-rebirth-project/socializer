import styled from 'styled-components';
import { Link } from '@reach/router';

interface WrapperProps {
  fontSize?: number;
}

export const Wrapper = styled(Link)<WrapperProps>`
  cursor: pointer;
  font-size: ${props => (props.fontSize ? props.fontSize : 1.2)}rem;
  color: ${props => props.theme.colors.secondary};
  opacity: 0.8;
  font-family: inherit;
  transition: all 0.1s ease-in-out;
  text-decoration: none;

  :hover {
    opacity: 1;
  }
`;
