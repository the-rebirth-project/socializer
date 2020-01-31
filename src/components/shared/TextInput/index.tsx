import React, { InputHTMLAttributes } from 'react';
import { StyledInput } from './styles';

interface TextInputProps extends InputHTMLAttributes<any> {
  hasError?: boolean;
}

export const TextInput: React.FC<TextInputProps> = props => {
  return <StyledInput {...props} hasError={props.hasError} />;
};
