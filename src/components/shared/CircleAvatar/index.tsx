import React from 'react';
import noProfileImg from '../../../img/no-img.png';
import { Wrapper } from './styles';

type CircleAvatarProps = {
  /**
   * The URL of the image to be rendered
   */
  imgUrl: string;
  /**
   * Determines the size of the avatar. The value provided here multiplies the default size.
   *
   * Default size of avatar in rem units is 4.15rem
   */
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
