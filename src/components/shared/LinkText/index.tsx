import React from 'react';
import { Wrapper } from './styles';

interface LinkTextProps {
  to: string;
}

export const LinkText: React.FC<LinkTextProps> = props => {
  return <Wrapper to={props.to}>{props.children}</Wrapper>;
};
