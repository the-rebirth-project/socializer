import React from 'react';
import { Wrapper } from './styles';

type FancyButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
};

export const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  onClick,
  type,
  disabled
}) => {
  return (
    <Wrapper onClick={onClick} disabled={disabled} type={type}>
      {children}
    </Wrapper>
  );
};
