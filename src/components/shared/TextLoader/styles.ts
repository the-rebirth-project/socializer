import styled, { keyframes } from 'styled-components';

const loadingAnim = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

export const Wrapper = styled.span`
  opacity: 0.8;
  font-size: inherit;
  color: inherit;
  animation: ${loadingAnim} 1s infinite ease-in-out;
`;
