import React from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Wrapper, SendBtn } from './styles';

type SendButtonProps = {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  iconSize?: number;
};

export const SendButton: React.FC<SendButtonProps> = ({
  onClick,
  iconSize
}) => {
  return (
    <Wrapper onClick={onClick}>
      {/* svg defs */}
      <svg width='0' height='0'>
        <defs>
          <filter id='dropShadowGraphic' x='0' y='0' width='200%' height='200%'>
            <feOffset result='offOut' in='SourceGraphic' dx='12' dy='6' />
            <feGaussianBlur result='blurOut' in='offOut' stdDeviation='10' />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>

          <linearGradient id='sendBtnGrad' x1='16%' y1='100%' x2='84%' y2='0%'>
            <stop offset='0%' stopColor='rgb(128,0,255)' stopOpacity={1} />
            <stop offset='100%' stopColor='rgb(86,170,255)' stopOpacity={1} />
          </linearGradient>
        </defs>
      </svg>

      <SendBtn icon={faPaperPlane} iconSize={iconSize}></SendBtn>
    </Wrapper>
  );
};
