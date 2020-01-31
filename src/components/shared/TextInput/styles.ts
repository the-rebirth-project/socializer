import styled from 'styled-components';

export const StyledInput = styled.input<{ hasError: boolean | undefined }>`
  border-radius: 22px;
  font-size: 1.6rem;
  padding: 1rem 1rem;
  font-family: inherit;
  color: ${props => props.theme.colors.textColor};
  border: 2px solid
    ${props =>
      props.hasError
        ? props.theme.colors.tertiary
        : props.theme.colors.secondary};
  background-color: ${props => props.theme.colors.cardBackground};
  box-shadow: 0px 3px 6px
    ${props =>
      props.hasError
        ? props.theme.colors.tertiary
        : props.theme.colors.secondary}40;
  transition: all 0.1s ease-in-out;

  :focus {
    outline: none;
    border: 3px solid
      ${props =>
        props.hasError
          ? props.theme.colors.tertiary
          : props.theme.colors.secondary};
    box-shadow: 0px 6px 39px
      ${props =>
        props.hasError
          ? props.theme.colors.tertiary
          : props.theme.colors.secondary}40;
  }
`;
