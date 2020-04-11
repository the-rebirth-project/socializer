import styled from 'styled-components';
import { Card } from '../../shared/Card';
import { SecondaryButton } from '../../shared/SecondaryButton';

export const Wrapper = styled(Card)`
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  width: 90%;
`;

export const UserInfoContainer = styled.main`
  display: grid;
  grid-template-rows: repeat(3, min-content);
  row-gap: 1.3rem;
  justify-content: center;
  justify-items: center;
  opacity: 1;
  text-align: center;
`;

export const UsernameContainer = styled.section`
  display: grid;
  grid-template-rows: auto;
  row-gap: 0.3rem;
  opacity: 1;
`;

export const UserBio = styled.section`
  text-align: left;
  width: 100%;
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  height: 3rem;
  width: 45%;
  font-size: 1.2rem;
  font-weight: 700;
`;

export const ActionButtonContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const SubscribeButtonContainer = styled.div`
  width: 100%;
`;
