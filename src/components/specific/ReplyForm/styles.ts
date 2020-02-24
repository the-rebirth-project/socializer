import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.textColor};
  color: ${props => props.theme.colors.background};
  border-radius: 2.2rem;
  display: grid;
  grid-template-columns: 7fr 1fr;
  align-items: center;
  padding: 1.3rem 1.5rem;
  width: 100%;
  box-shadow: 0px 3px 15px ${props => props.theme.colors.textColor}40;

  transition: all 0.15s ease-in-out;
`;

export const TextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 0rem;
  font-family: inherit;
  font-size: 1.4rem;
  color: ${props => props.theme.colors.textColor};
  resize: none;
  line-height: 1.35;
`;
