import React from 'react';
import { Wrapper } from './styles';

export const FancyButton: React.FC<React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = props => {
  return <Wrapper>{props.children}</Wrapper>;
};
