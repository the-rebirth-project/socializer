import styled from 'styled-components';
import { LoadingSpinner } from '../../shared/LoadingSpinner';

export const Wrapper = styled.div`
  display: grid;
  row-gap: 0.1rem;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-word;
  width: 100%;
  line-height: 1.4;
`;

// wraps around the loading spinner too
export const RepliesContainer = styled.div`
  border-left: 1px solid ${props => props.theme.colors.textColor};
  margin-left: 0.5rem;
  padding-left: 1rem;
  margin-top: 0.5rem;
  position: relative;
`;

// wraps around the list of replies
export const RepliesWrapper = styled.section`
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 0.5rem;
`;

export const ClickableSpan = styled.span`
  cursor: pointer;
`;

export const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
