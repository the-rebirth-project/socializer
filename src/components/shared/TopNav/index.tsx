import React from 'react';
import { useUserState } from '../../../contexts/UserContext';
import { NavLink } from '../NavLink';
import {
  faHome,
  faUser,
  faSearch,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { Wrapper } from './styles';
import { NavIcon } from '../NavIcon';

export const TopNav = () => {
  const { userHandle } = useUserState();

  return (
    <Wrapper>
      <NavLink to='/home'>
        <NavIcon icon={faHome} />
      </NavLink>

      <NavLink to='/explore'>
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
