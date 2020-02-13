import styled, { keyframes, css } from 'styled-components';

const Spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

type SpinnerProps = {
  small?: boolean;
};

const SmallSpinnerStyles = css`
  border-width: 0.5rem;
  padding: 0.5rem;
`;

export const Spinner = styled.div<SpinnerProps>`
  border-radius: 50%;
  border: 1rem solid ${props => props.theme.colors.textColor};
  padding: 1rem;
  border-right-color: transparent;
  border-left-color: transparent;
  display: inline-block;
  animation: 1.5s ${Spin} ease-in-out infinite;

  ${props => props.small && SmallSpinnerStyles}
`;
