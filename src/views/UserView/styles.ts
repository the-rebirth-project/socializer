import styled from 'styled-components';
import { Card } from '../../components/shared/Card';

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  justify-items: center;
  row-gap: 2rem;
  width: 90%;
  margin: 0 auto;
`;

export const StyledCard = styled(Card)`
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
  position: relative;
  overflow: show;
`;

export const UsernameContainer = styled.section`
  display: grid;
  grid-template-rows: 1fr 0.8fr 1fr;
  opacity: 1;
`;
