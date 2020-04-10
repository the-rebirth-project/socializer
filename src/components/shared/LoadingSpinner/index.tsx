import React from 'react';
import { animated, useTransition } from 'react-spring';
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
  children,
}) => {
  const transitions = useTransition(loading, (p) => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const SpinnerElement = <Spinner small={small}></Spinner>;

  return (
    <>
      {loading === 1 &&
        (centerSpinner ? <Wrapper>{SpinnerElement}</Wrapper> : SpinnerElement)}

      {transitions.map(
        ({ item, key, props }) =>
          !item && (
            <animated.div key={key} style={props}>
              {children}
            </animated.div>
          )
      )}
    </>
  );
};
