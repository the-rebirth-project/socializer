import { css } from 'styled-components';

export const scrollbarStyles = css`
  ::-webkit-scrollbar {
    width: 0.25rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: ${props => props.theme.colors.textColor};
  }
`;
