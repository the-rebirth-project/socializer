import React from 'react';
import { Link, LinkProps } from '@reach/router';

// went with any for the typing because frustration
export const NavLink: React.FC<LinkProps<{}>> = props => {
  return (
    <Link
      to={props.to}
      children={props.children}
      getProps={props => {
        return {
          style: {
            opacity: props.isPartiallyCurrent ? 1 : 0.6
          }
        };
      }}
    />
  );
};
