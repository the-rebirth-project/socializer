import styled from 'styled-components';
import { LoadingSpinner } from '../../shared/LoadingSpinner';

// wraps around the loading spinner as well
export const Wrapper = styled.div`
  border-left: 1px solid ${props => props.theme.colors.textColor};
  margin-left: 0.5rem;
  padding-left: 1rem;
  margin-top: 0.5rem;
  position: relative;
`;

export const RepliesContainer = styled.section`
  display: grid;
  grid-auto-rows: min-content;
  row-gap: 0.5rem;
`;

export const StyledLoadingSpinner = styled(LoadingSpinner)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
