import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { scrollbarStyles } from '../../../constants/scrollbarStyles';

export const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: min-content 1fr;
`;

export const UserHeader = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr;
  column-gap: 1rem;
  padding: 0rem 1rem;
`;

export const UsernameContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Body = styled.main`
  width: 100%;
  height: auto;
  background-color: ${props => props.theme.colors.cardBackground};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1.5rem 1rem;
  padding-bottom: 4rem;
  position: relative;
`;

export const StyledTextArea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  background-color: transparent;
  padding: 0rem;
  font-family: inherit;
  font-size: 1.35rem;
  color: ${props => props.theme.colors.textColor};
  resize: none;
  padding-right: 0.5rem;
  line-height: 1.35;
  margin-bottom: 2rem;

  :focus {
    outline: rgba(255, 255, 255, 0);
  }

  ${scrollbarStyles};

  ::-webkit-scrollbar {
    display: none; /* FOR MOBILE ONLY */
  }
`;

export const PostButtonContainer = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
`;
