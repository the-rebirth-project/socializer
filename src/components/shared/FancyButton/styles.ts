import styled, { css } from 'styled-components';

type WrapperProps = {
  disabled?: boolean;
};

export const Wrapper = styled.button<WrapperProps>`
  outline: none;
  border: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.4rem;
  color: ${props => props.theme.colors.textColor};
  border-radius: 3.4rem;
  font-size: 1.8rem;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );
  font-family: inherit;
  transition: all 0.2s ease-in-out;

  ${props => (props.disabled ? disabledStyles : activeStyles)}
`;

const disabledStyles = css`
  cursor: not-allowed;

  :hover,
  active {
    transform: none;
  }
`;

const activeStyles = css`
  cursor: pointer;
  box-shadow: 0px 3px 6px ${props => props.theme.colors.primary}40;
  opacity: 1;
  :hover {
    transform: translateY(-1px);
  }

  :active {
    transform: translateY(0.5px);
  }
`;
