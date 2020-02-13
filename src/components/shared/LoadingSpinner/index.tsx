import React from 'react';
import { Spinner, Wrapper } from './styles';

type LoadingSpinnerProps = {
  loading: number; // 1 for true and 0 for false
  centerSpinner?: boolean; // centers spinner as a fixed element
  small?: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  centerSpinner,
  small,
  children
}) => {
  const SpinnerElement = <Spinner small={small}></Spinner>;

  return (
    <>
      {loading === 1 &&
        (centerSpinner ? <Wrapper>{SpinnerElement}</Wrapper> : SpinnerElement)}

      {!loading && <>{children}</>}
    </>
  );
};
