import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const Wrapper = styled.section`
  width: 32rem;
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
  line-height: 1.45;
  margin-bottom: 2rem;

  :focus {
    outline: rgba(255, 255, 255, 0);
  }

  ::-webkit-scrollbar {
    width: 0.5rem;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: ${props => props.theme.colors.textColor};
  }
`;

export const PostButtonContainer = styled.div`
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
`;
