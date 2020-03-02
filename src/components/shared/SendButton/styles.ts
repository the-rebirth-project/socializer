import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg * {
    position: absolute;
    right: 1rem;
    fill: ${props => props.theme.colors.textColor};
    filter: url(#dropShadowGraphic);
  }
`;

type SendBtnProps = {
  iconSize: number | undefined;
  disabled?: boolean;
};
export const SendBtn = styled(FontAwesomeIcon)<SendBtnProps>`
  font-size: ${props => (props.size ? props.size : 1.9)}rem;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translate(1px, -1px);
  }

  ${props =>
    props.disabled &&
    css`
      cursor: default;

      :hover {
        transform: translate(0px, 0px);
      }
    `}
`;
