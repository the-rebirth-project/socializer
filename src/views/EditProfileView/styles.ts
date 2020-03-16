import styled from 'styled-components';
import { FancyButton } from '../../components/shared/FancyButton';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  justify-content: center;
  padding: 4rem 0rem;
  row-gap: 4rem;
`;

export const ActionsAndFormWrapper = styled.section`
  display: grid;
  grid-template-rows: auto;
  row-gap: 1.3rem;
`;

export const SeriousFancyButton = styled(FancyButton)`
  border-radius: 5px;
  background-color: transparent;
  background-image: none;
  border: 2px solid ${props => props.theme.colors.tertiary};
  color: ${props => props.theme.colors.tertiary};
  box-shadow: 0px 3px 6px ${props => props.theme.colors.tertiary}40;
  font-size: 1.6rem;
  transition: all 0.2s ease-in-out;

  :hover {
    transform: translateY(-1px);
    box-shadow: 0px 6px 39px ${props => props.theme.colors.tertiary}40;
  }

  :active {
    transform: translateY(0.5px);
  }
`;
