import React from 'react';
import { Wrapper } from './styles';

type CircleAvatarProps = {
  imgUrl: string;
};

export const CircleAvatar: React.FC<CircleAvatarProps> = ({ imgUrl }) => {
  return <Wrapper src={imgUrl} alt='profile photo' />;
};
