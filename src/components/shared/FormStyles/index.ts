import styled from 'styled-components';

export const FormFieldGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  row-gap: 0.7rem;
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.tertiary};
  font-size: 1.2rem;
`;

export const MetaTextContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 1.3rem;
`;

export const CheckboxFieldGrid = styled.div`
  margin-left: 1rem;
  display: grid;
  grid-template-columns: 0.09fr 3fr;
`;
