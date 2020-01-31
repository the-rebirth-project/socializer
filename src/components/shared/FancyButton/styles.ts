import styled from 'styled-components';

export const Wrapper = styled.button`
  outline: none;
  border: none;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.4rem;
  color: ${props => props.theme.colors.textColor};
  border-radius: 3.4rem;
  font-size: 1.8rem;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );
  font-family: inherit;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  box-shadow: 0px 3px 6px ${props => props.theme.colors.primary}40;

  :hover {
    transform: translateY(-1px);
  }

  :active {
    transform: translateY(0.5px);
  }
`;
