import styled from 'styled-components';

export const Wrapper = styled.section`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );
  padding: 1rem 0rem;
  width: 100%;
  height: 6rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;
