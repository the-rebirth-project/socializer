import styled from 'styled-components';
import Img from 'react-image';

type WrapperProps = {
  sizeScaling?: number;
};

const size = 4.15;
export const Wrapper = styled(Img)<WrapperProps>`
  display: block;
  height: ${props => (props.sizeScaling ? props.sizeScaling * size : size)}rem;
  width: ${props => (props.sizeScaling ? props.sizeScaling * size : size)}rem;
  border-radius: 50%;
  border: 2px solid ${props => props.theme.colors.textColor};
  object-fit: cover;
`;
