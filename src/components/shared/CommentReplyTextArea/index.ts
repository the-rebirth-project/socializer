import styled from 'styled-components';
import AutosizeTextarea from 'react-textarea-autosize';
import { scrollbarStyles } from '../../../constants';

export const CommentReplyTextArea = styled.textarea`
  width: 100%;
  height: 6rem;
  border: none;
  background-color: transparent;
  padding: 0rem;
  font-family: inherit;
  font-size: 1.35rem;
  color: ${props => props.theme.colors.textColor};
  resize: none;
  line-height: 1.35;
  padding-right: 0.5rem;

  :focus {
    outline: none;
  }

  ${scrollbarStyles}
`;
