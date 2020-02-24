import React from 'react';
import { Wrapper } from './styles';

type GradientBoxProps = {
  sizeScaling?: number; // scale factor
};

export const GradientBox: React.FC<GradientBoxProps> = ({
  children,
  sizeScaling
}) => {
  return <Wrapper sizeScaling={sizeScaling}>{children}</Wrapper>;
};
