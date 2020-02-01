import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: grid;
  grid-template-rows: repeat(2, 1fr) 0.1fr 0.1fr 1.3fr;
  grid-template-columns: 28rem;
  row-gap: 1.3rem;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
  grid-area: 5 / 1 / 6 / 2;
`;
