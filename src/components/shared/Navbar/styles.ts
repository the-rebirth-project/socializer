import styled from 'styled-components';

export const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 5rem;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );

  box-shadow: 0px 3px 6px ${props => props.theme.colors.primary}40;
`;

export const FlexContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const TitleContainer = styled.div`
  margin: 0 auto;
`;
