import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 7.7rem fit-content;
`;

export const Comment = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 1rem;
`;

export const PostHeader = styled.header`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;
`;

export const PostMetadata = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 0.5rem;
`;

export const UsernameContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ProfilePictureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostBody = styled.main`
  background-color: ${props => props.theme.colors.cardBackground};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: relative;
  width: 100%;
  display: grid;
  padding: 1.5rem 1rem;
  grid-template-rows: repeat(2, min-content) 4rem;
  row-gap: 1rem;
`;

export const ParagraphText = styled.p`
  font-size: 1.35rem;
  font-weight: 400;
  color: ${props => props.theme.colors.textColor};
  line-height: 2rem;
  white-space: pre-wrap;
`;

export const CommentTextInput = styled.input`
  color: ${props => props.theme.colors.cardBackground};
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

export const SendBtnWrapper = styled.div`
  cursor: pointer;
`;

export const SendBtn = styled(FontAwesomeIcon)`
  font-size: 1.9rem;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translate(1px, -1px);
  }
`;

export const CommentInputFieldContainer = styled.div`
  background-color: ${props => props.theme.colors.textColor};
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
  display: flex;
  flex-direction: row;
  transition: all 0.15s ease-in-out;

  svg * {
    position: absolute;
    right: 1rem;
    fill: url(#sendBtnGrad);
    filter: url(#dropShadowGraphic);
  }
`;

type SvgWrapperProps = {
  likedPost?: boolean;
};

export const SvgWrapper = styled.div<SvgWrapperProps>`
  font-size: 2.8rem;
  display: flex;
  justify-content: flex-end;
  padding: 0rem 1rem;
  cursor: pointer;
  svg * {
    fill: ${props => props.theme.colors.textColor};
    transition: all 0.2s ease-in-out;

    ${props =>
      props.likedPost
        ? css`
            fill: url(#lgrad);
            filter: url(#dropShadowGraphic);
          `
        : css`
            fill: ${props => props.theme.colors.textColor};
            filter: url(#dropShadowWhite);
          `}
  }
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translateY(-1px);
  }

  :active {
    transform: translateY(0px);
  }
`;
