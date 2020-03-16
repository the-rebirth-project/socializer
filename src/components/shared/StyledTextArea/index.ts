import styled from 'styled-components';
import AutosizeTextarea from 'react-textarea-autosize';

export const StyledTextArea = styled(AutosizeTextarea)`
  width: 100%;
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-size: 1.35rem;
  color: ${props => props.theme.colors.textColor};
  resize: none;
  line-height: 1.35;
  padding: 0rem;
  padding-right: 0.5rem;

  :focus {
    outline: none;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
