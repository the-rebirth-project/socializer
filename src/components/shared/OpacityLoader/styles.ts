import styled from 'styled-components';

type WrapperProps = {
  loading?: boolean;
  defaultOpacity: number;
};
export const Wrapper = styled.div<WrapperProps>`
  opacity: ${props => (props.loading ? 0.7 : props.defaultOpacity)} !important;
  transition: all 0.2s ease-in-out;
`;
