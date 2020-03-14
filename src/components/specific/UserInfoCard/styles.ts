import styled from 'styled-components';
import { Card } from '../../shared/Card';
import { FancyButton } from '../../shared/FancyButton';

export const Wrapper = styled(Card)`
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  width: 80%;
`;

export const UserInfoContainer = styled.main`
  display: grid;
  grid-template-rows: repeat(3, min-content);
  row-gap: 1rem;
  justify-items: center;
  opacity: 1;
  text-align: center;
`;

export const UsernameContainer = styled.section`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  opacity: 1;
`;

export const UserBio = styled.section`
  text-align: center;
  width: 80%;
`;

export const StyledFancyButton = styled(FancyButton)`
  border-radius: 5px;
  height: 3rem;
  width: 10rem;
  font-size: 1.2rem;
`;
