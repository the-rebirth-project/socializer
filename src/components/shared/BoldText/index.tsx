import React from 'react';
import { Wrapper } from './styles';

interface BoldTextProps {
  size?: number;
}

export const BoldText: React.FC<BoldTextProps> = ({ size, children }) => {
  return <Wrapper size={size}>{children}</Wrapper>;
};
