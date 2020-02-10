import styled from 'styled-components';

type WrapperProps = {
  loading: boolean | undefined;
  defaultOpacity: number;
  loadingOpacity?: number;
};

// returns the prop value if it is defined
const propIfDefined = (
  prop: number | undefined,
  defaultVal: number | string
): number | string => {
  return prop ? prop : defaultVal;
};

export const Wrapper = styled.div<WrapperProps>`
  opacity: ${props =>
    props.loading
      ? propIfDefined(props.loadingOpacity, 0.7)
      : props.defaultOpacity} !important;
  transition: all 0.2s ease-in-out;
`;
