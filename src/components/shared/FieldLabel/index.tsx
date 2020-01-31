import React from 'react';
import { Wrapper } from './styles';

interface FieldLabelProps {
  margin?: {
    left: number;
    right: number;
    top: number;
    bottom: number;
  };
  hasError?: boolean;
}

export const FieldLabel: React.FC<FieldLabelProps> = ({
  children,
  margin,
  hasError
}) => {
  return (
    <Wrapper margin={margin} hasError={hasError}>
      {children}
    </Wrapper>
  );
};

FieldLabel.defaultProps = {
  margin: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
};
