import styled from 'styled-components';

type WrapperProps = {
  size?: number;
};

export const Wrapper = styled.span<WrapperProps>`
  color: ${props => props.theme.colors.textColor};
  font-size: ${props => (props.size ? props.size : 2.1)}rem;
  font-weight: 700;
`;
