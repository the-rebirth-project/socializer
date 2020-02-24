import React from 'react';
import noProfileImg from '../../../img/no-img.png';
import { Wrapper } from './styles';

type CircleAvatarProps = {
  imgUrl: string;
  sizeScaling?: number;
};

export const CircleAvatar: React.FC<CircleAvatarProps> = ({
  imgUrl,
  sizeScaling
}) => {
  return (
    <Wrapper
      src={[imgUrl, noProfileImg]}
      alt='profile photo'
      sizeScaling={sizeScaling}
    />
  );
};
