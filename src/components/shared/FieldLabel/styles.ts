import styled from 'styled-components';

interface WrapperProps {
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  hasError?: boolean;
}

export const Wrapper = styled.label<WrapperProps>`
  font-size: 1.2rem;
  margin-left: ${props => props.margin?.left}rem;
  margin-right: ${props => props.margin?.right}rem;
  margin-top: ${props => props.margin?.top}rem;
  margin-bottom: ${props => props.margin?.bottom}rem;
  color: ${props =>
    props.hasError
      ? props.theme.colors.tertiary
      : props.theme.colors.secondary};
`;
