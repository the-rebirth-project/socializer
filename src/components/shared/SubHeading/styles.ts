import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const Content = styled.h3`
  font-size: 2.3rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textColor};

  ::after {
    content: '';
    display: block;
    height: 2px;
    width: 50%;
    margin: 0.5rem auto;
    background-image: linear-gradient(
      to right,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.secondary}
    );
  }
`;
