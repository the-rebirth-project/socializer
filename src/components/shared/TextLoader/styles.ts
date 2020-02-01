import styled, { keyframes } from 'styled-components';

const loadingAnim = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

interface WrapperProps {
  fontSize?: number; // in rem
}

export const Wrapper = styled.span<WrapperProps>`
  opacity: 0.8;
  font-size: ${props => (props.fontSize ? props.fontSize : 1.4)}rem;
  color: ${props => props.theme.colors.textColor};
  animation: ${loadingAnim} 1s infinite ease-in-out;
`;
