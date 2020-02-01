import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = styled(FontAwesomeIcon)`
  height: 1rem;
  width: 1rem;
  color: ${props => props.theme.colors.background};
  opacity: 0;
  transition: all 0.2s ease-in-out;
`;

export const Overlay = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border: 2px solid ${props => props.theme.colors.secondary};
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  position: relative;
  input {
    height: 1.6rem;
    width: 1.6rem;
    cursor: pointer;
    opacity: 0;
    position: absolute;
    top: 0;

    :checked ~ ${Overlay} {
      background-color: ${props => props.theme.colors.secondary};

      ${Icon} {
        opacity: 1;
        transform: rotate(360deg);
      }
    }
  }
`;
