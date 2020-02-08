import React from 'react';
import { Wrapper } from './styles';

type SizedBoxProps = {
  height?: number;
  width?: number;
};

export const SizedBox: React.FC<SizedBoxProps> = ({ height, width }) => {
  return (
    <Wrapper height={height} width={width}>
      dummy content
    </Wrapper>
  );
};
