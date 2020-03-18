import React from 'react';
import { Spinner, Wrapper } from './styles';

type LoadingSpinnerProps = {
  /**
   * Provide 1 for true or 0 for false. This is to silence warnings from React.
   */
  loading: number;
  /**
   * Setting this to true results in the Spinner being absolutely positioned in the centre of the relative element.
   */
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
