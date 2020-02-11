import React from 'react';
import { Wrapper, Spinner } from './styles';

type LoadingSpinnerProps = {
  loading: boolean;
  alignCenter?: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  alignCenter,
  children
}) => {
  return (
    <>
      {loading && (
        <Wrapper alignCenter={alignCenter}>
          <Spinner></Spinner>
        </Wrapper>
      )}

      {!loading && <>{children}</>}
    </>
  );
};
