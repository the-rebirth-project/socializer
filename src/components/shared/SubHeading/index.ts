import styled from 'styled-components';

export const SubHeading = styled.h3`
  font-size: 2.3rem;
  font-weight: 600;
  width: fit-content;
  text-align: center;
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
