import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 1fr) 0.1fr 0.1fr 1.3fr;
  grid-template-columns: 28rem;
  row-gap: 1.3rem;
  justify-content: center;
`;

export const FormFieldGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  row-gap: 0.7rem;
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.tertiary};
  font-size: 1.2rem;
`;

export const SubmitErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 1.3rem;
`;

export const ButtonContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
  grid-area: 6 / 1 / 7 / 2;
`;

export const CheckboxFieldGrid = styled.div`
  margin-left: 1rem;
  display: grid;
  grid-template-columns: 0.09fr 3fr;
`;
