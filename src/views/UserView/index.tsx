import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Text } from '../../components/shared/Text';
import { CircleAvatar } from '../../components/shared/CircleAvatar';
import {
  Wrapper,
  StyledCard,
  UserInfoContainer,
  UsernameContainer
} from './styles';

type RouteParams = {
  userHandle: string;
};

export const UserView: React.FC<RouteComponentProps<RouteParams>> = ({
  userHandle
}) => {
  return (
    <Wrapper>
      <StyledCard>
        <UserInfoContainer>
          <CircleAvatar imgUrl='' sizeScaling={1.5} />
          <UsernameContainer>
            <Text weight={700} size={1.8}>
              {userHandle}
            </Text>
            <Text opacity={0.7} size={1.2}>
              10K Connects | 33K Posts | 35M Seeds
            </Text>
          </UsernameContainer>
        </UserInfoContainer>
      </StyledCard>
    </Wrapper>
  );
};
