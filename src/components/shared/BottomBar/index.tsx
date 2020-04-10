import React from 'react';
import { useUserState } from '../../../contexts/UserContext';
import {
  faHome,
  faUser,
  faSearch,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import { useShowNav } from '../../../hooks/useShowNav';
import { NavLink } from '../NavLink';
import { NavIcon } from '../NavIcon';
import { Wrapper } from './styles';

export const BottomBar: React.FC = () => {
  const show = useShowNav();
  const { userHandle } = useUserState();

  return show ? (
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
  ) : null;
};
