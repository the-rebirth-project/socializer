import styled from 'styled-components';
import { LoadingSpinner } from '../../shared/LoadingSpinner';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-word;
  width: 100%;
  line-height: 2rem;
`;

export const RepliesContainer = styled.div`
  border-left: 1px solid ${props => props.theme.colors.textColor};
  display: block;
  margin-left: 0.5rem;
  padding-left: 1rem;
  margin-top: 0.5rem;
  position: relative;
`;

export const ClickableSpan = styled.span`
  cursor: pointer;
`;

export const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
