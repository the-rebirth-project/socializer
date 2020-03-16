import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 10;
`;

export const Modal = styled.main`
  width: 90%;
  position: relative;
  z-index: 15;
`;

export const ModalHeader = styled.header`
  width: 100%;
  background-color: ${props => props.theme.colors.tertiary};
  font-size: 1.6rem;
`;

export const ModalBody = styled.section`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: ${props => props.theme.colors.cardBackground};
`;
