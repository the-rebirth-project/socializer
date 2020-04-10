import styled from 'styled-components';

export const Wrapper = styled.section`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 1rem;
  align-items: center;
  min-height: 4rem;
  width: 100%;

  background-color: ${(props) => props.theme.colors.cardBackground};
  padding: 1rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translateY(-2px);
  }

  :active {
    transform: translateY(0.5px);
  }
`;
