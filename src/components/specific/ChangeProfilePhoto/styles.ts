import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  row-gap: 1.3rem;
  justify-items: center;
  width: 100%;
`;

type UploadButtonProps = {
  disabled?: boolean;
};

export const UploadButton = styled.label<UploadButtonProps>`
  border: 2px solid ${props => props.theme.colors.secondary};
  box-shadow: 0px 3px 6px ${props => props.theme.colors.secondary}40;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.4rem;
  width: 100%;
  cursor: pointer;
  color: ${props => props.theme.colors.secondary};
  transition: all 0.2s ease-in-out;
  background-color: transparent;
  border-radius: 5px;
  margin-bottom: 2.7rem;

  :hover {
    transform: translateY(-1px);
    box-shadow: 0px 6px 40px ${props => props.theme.colors.secondary}40;
  }

  :active {
    transform: translateY(0.5px);
  }

  ${props =>
    props.disabled &&
    css`
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
    `}
`;
