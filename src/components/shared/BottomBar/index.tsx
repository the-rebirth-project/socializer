import React from 'react';
import { useUserState } from '../../../contexts/UserContext';
import {
  faHome,
  faUser,
  faSearch,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from '../NavLink';
import { Wrapper, NavIcon } from './styles';

export const BottomBar: React.FC = () => {
  const { userHandle } = useUserState();

  return (
    <Wrapper>
      <NavLink to='/home'>
        <NavIcon icon={faHome} />
      </NavLink>
      <NavLink to='/search'>
        <NavIcon icon={faSearch} />
      </NavLink>
      <NavLink to='/notifications'>
        <NavIcon icon={faBell} />
      </NavLink>
      <NavLink to={`/users/${userHandle}`}>
        <NavIcon icon={faUser} />
      </NavLink>
    </Wrapper>
  );
};
