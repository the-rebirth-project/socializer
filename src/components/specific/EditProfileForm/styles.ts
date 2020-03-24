import styled from 'styled-components';
import { StyledTextArea } from '../../shared/StyledTextArea';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 28rem;
  row-gap: 1.3rem;
  justify-content: center;
`;

type TextAreaProps = {
  hasError?: boolean;
};
export const TextArea = styled(StyledTextArea)<TextAreaProps>`
  background-color: ${props => props.theme.colors.cardBackground};
  padding: 1rem 1rem;
  border-radius: 5px;
  border: 2px solid
    ${props =>
      props.hasError
        ? props.theme.colors.tertiary
        : props.theme.colors.secondary};
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

export const ButtonContainer = styled.div`
  margin-top: 2.7rem;
  display: grid;
  grid-template-rows: auto;
  row-gap: 2rem;
`;
