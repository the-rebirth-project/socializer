import React from 'react';
import { Wrapper } from './styles';

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: number;
  opacity?: number;
  weight?: number;
}

export const Text: React.FC<TextProps> = props => {
  return (
    <Wrapper
      {...props}
      size={props.size}
      opacity={props.opacity}
      weight={props.weight}
    >
      {props.children}
    </Wrapper>
  );
};
