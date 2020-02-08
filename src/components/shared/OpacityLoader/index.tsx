import React from 'react';
import { Wrapper } from './styles';

type OpacityLoaderProps = {
  loading?: boolean;
  defaultOpacity: number; // the opacity to use once loading is done i.e element's default state
};

// This component makes elements less opaque if loading is true. Used as a loader when making api requests

export const OpacityLoader: React.FC<OpacityLoaderProps> = ({
  children,
  loading,
  defaultOpacity
}) => {
  return (
    <Wrapper loading={loading} defaultOpacity={defaultOpacity}>
      {children}
    </Wrapper>
  );
};
