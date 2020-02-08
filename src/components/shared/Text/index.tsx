import React from 'react';
import { Wrapper } from './styles';

type TextProps = {
  size?: number;
  opacity?: number;
  weight?: number;
};

export const Text: React.FC<TextProps> = ({
  size,
  opacity,
  weight,
  children
}) => {
  return (
    <Wrapper size={size} opacity={opacity} weight={weight}>
      {children}
    </Wrapper>
  );
};
