import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.background};
  display: grid;
  grid-template-rows: auto;
  row-gap: 4rem;
  justify-content: center;
  justify-items: center;
`;
