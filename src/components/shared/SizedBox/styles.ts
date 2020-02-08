import styled from 'styled-components';

type WrapperProps = {
  height?: number;
  width?: number;
};

export const Wrapper = styled.div<WrapperProps>`
  height: ${props => (props.height ? `${props.height}rem` : 'auto')};
  width: ${props => (props.width ? `${props.width}rem` : 'auto')};
  opacity: 0;
`;
