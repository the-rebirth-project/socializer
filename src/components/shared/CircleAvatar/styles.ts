import styled from 'styled-components';

type WrapperProps = {
  sizeScaling?: number;
};

const size = 4.15;
export const Wrapper = styled.img<WrapperProps>`
  display: block;
  height: ${props => (props.sizeScaling ? props.sizeScaling * size : size)}rem;
  width: ${props => (props.sizeScaling ? props.sizeScaling * size : size)}rem;
  border-radius: 50%;
  border: 2px solid transparent;
  object-fit: cover;
`;
