import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
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
