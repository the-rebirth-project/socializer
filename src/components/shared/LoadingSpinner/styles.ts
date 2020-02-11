import styled, { keyframes, css } from 'styled-components';

const Spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// alignCenter positions elem in the middle of the page
type WrapperProps = {
  alignCenter?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);

  ${props =>
    props.alignCenter
      ? css`
          top: 50%;
          transform: translate(-50%, -50%);
        `
      : ''}
`;

export const Spinner = styled.div`
  border-radius: 50%;
  border: 1rem solid ${props => props.theme.colors.textColor};
  padding: 1rem;
  border-right-color: transparent;
  border-left-color: transparent;
  display: inline-block;
  animation: 1.5s ${Spin} ease-in-out infinite;
`;
