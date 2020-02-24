import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.textColor};
  color: ${props => props.theme.colors.cardBackground};
  padding: 1.3rem 1rem;
  display: grid;
  grid-template-columns: 7fr 1fr;
  align-items: center;
  font-size: 1.6rem;
  box-shadow: 0px 3px 15px ${props => props.theme.colors.textColor}40;
  border-radius: 22px;
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  transition: all 0.15s ease-in-out;
`;

export const TextInput = styled.input`
  color: inherit;
  font-size: inherit;
  /* White color */
  background: transparent;
  outline: none;
  border: none;
  width: 100%;
  padding-right: 1rem;

  ::placeholder {
    font-size: inherit;
    opacity: 0.6;
    font-family: inherit;
  }
`;

export const InputLabel = styled.label`
  font-size: 1rem;
  color: ${props => props.theme.colors.textColor};
  opacity: 0;
  pointer-events: none;
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease-in-out;

  ${TextInput}:focus ~ & {
    opacity: 1;
    top: -1.5rem;
    transform: translateY(0%);
  }
`;
