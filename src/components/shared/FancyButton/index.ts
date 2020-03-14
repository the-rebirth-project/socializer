import styled from 'styled-components';

type FancyButtonProps = {
  sizeScaling?: number;
};

export const FancyButton = styled.button<FancyButtonProps>`
  border: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${props => (props.sizeScaling ? props.sizeScaling * 4.4 : 4.4)}rem;
  color: ${props => props.theme.colors.textColor};
  border-radius: 3.4rem;
  font-size: 1.8rem;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0px 3px 6px ${props => props.theme.colors.primary}40;
  opacity: 1;

  :hover {
    transform: translateY(-1px);
  }

  :active {
    transform: translateY(0.5px);
  }

  transition: all 0.2s ease-in-out;

  :disabled {
    cursor: default;
    opacity: 0.8;
  }

  :active {
    outline: none;
  }

  :focus {
    outline: none;
  }
`;
