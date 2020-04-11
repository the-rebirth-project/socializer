import styled, { css } from 'styled-components';
import { scrollbarStyles } from '../../../constants/scrollbarStyles';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 7.7rem fit-content;
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
  background-color: ${(props) => props.theme.colors.cardBackground};
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: relative;
  width: 100%;
  display: grid;
  padding: 1.5rem 1rem;
  grid-template-rows: repeat(3, min-content);
  row-gap: 1rem;
`;

export const ParagraphText = styled.p`
  font-size: 1.35rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.textColor};
  line-height: 1.35;
  white-space: pre-wrap;
  max-height: 30rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 1rem;

  ${scrollbarStyles};
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
    fill: ${(props) => props.theme.colors.textColor};
    transition: all 0.2s ease-in-out;

    ${(props) =>
      props.likedPost
        ? css`
            fill: url(#lgrad);
            filter: url(#dropShadowGraphic);
          `
        : css`
            fill: ${(props) => props.theme.colors.textColor};
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
