import styled, { css } from 'styled-components';

type SecondaryButtonProps = {
  serious?: boolean;
  small?: boolean;
};

export const SecondaryButton = styled.button<SecondaryButtonProps>`
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border-radius: 5px;
  font-size: 1.6rem;
  font-family: inherit;
  width: 100%;
  height: 4.4rem;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => {
    const color = props.serious
      ? props.theme.colors.tertiary
      : props.theme.colors.secondary;
    return css`
      border: 2px solid ${color};
      box-shadow: 0px 3px 6px ${color}40;
      color: ${color};

      :hover {
        transform: translateY(-1px);
        box-shadow: 0px 6px 40px ${color}40;
      }

      :active {
        transform: translateY(0.5px);
      }
    `;
  }}
  :disabled {
    cursor: default;
    opacity: 0.7;
    box-shadow: none;

    :hover {
      transform: none;
      box-shadow: none;
    }

    :active {
      transform: none;
    }
  }

  :focus {
    outline: none;
  }

  ${(props) =>
    props.small &&
    css`
      height: 3rem;
      font-size: 1.2rem;
      font-weight: 700;
    `}
`;
