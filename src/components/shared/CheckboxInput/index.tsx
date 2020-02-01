import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, Overlay, Icon } from './styles';

export const CheckboxInput: React.FC<React.InputHTMLAttributes<
  any
>> = props => {
  return (
    <Wrapper>
      <input {...props} type='checkbox' id='check' />
      <Overlay htmlFor='check'>
        <Icon icon={faCheck} />
      </Overlay>
    </Wrapper>
  );
};
