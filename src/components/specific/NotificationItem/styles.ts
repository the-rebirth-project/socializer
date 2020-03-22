import styled from 'styled-components';

type WrapperProps = {
  lastNotif?: boolean;
};
export const Wrapper = styled.section<WrapperProps>`
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 1rem;
  align-items: center;
  min-height: 4rem;
  padding: 1rem 2rem;
  width: 100vw;
  position: relative;

  ::after {
    content: '';
    display: block;
    height: 1px;
    width: 100vw;
    background-color: ${props => props.theme.colors.textColor};
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: ${props => (props.lastNotif ? 0 : 0.3)};
  }
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  align-items: center;
  min-height: 100%;
  width: 100%;
`;
