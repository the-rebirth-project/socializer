import React from 'react';

// a component that renders an svg containing the defs used to style some of the components in PostItem
// decided to put this in a separate file to declutter PostItem

export const SvgDefs: React.FC = () => {
  return (
    <svg width='0' height='0'>
      <defs>
        <linearGradient id='lgrad' x1='16%' y1='100%' x2='84%' y2='0%'>
          <stop offset='0%' stopColor='rgb(13,255,214)' stopOpacity={1} />
          <stop offset='100%' stopColor='rgb(219, 251, 0)' stopOpacity={1} />
        </linearGradient>
        <filter id='dropShadowGraphic' x='0' y='0' width='200%' height='200%'>
          <feOffset result='offOut' in='SourceGraphic' dx='12' dy='6' />
          <feGaussianBlur result='blurOut' in='offOut' stdDeviation='10' />
          <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
        </filter>
        <filter id='dropShadowWhite' x='0' y='0' width='200%' height='200%'>
          <feOffset result='offOut' in='SourceGraphic' dx='0' dy='3' />
          <feColorMatrix
            result='matrixOut'
            in='offOut'
            type='matrix'
            values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'
          />
          <feGaussianBlur result='blurOut' in='offOut' stdDeviation='6' />
          <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
        </filter>

        <linearGradient id='sendBtnGrad' x1='16%' y1='100%' x2='84%' y2='0%'>
          <stop offset='0%' stopColor='rgb(128,0,255)' stopOpacity={1} />
          <stop offset='100%' stopColor='rgb(86,170,255)' stopOpacity={1} />
        </linearGradient>
      </defs>
    </svg>
  );
};
