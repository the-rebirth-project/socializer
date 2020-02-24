import styled from 'styled-components';

type WrapperProps = { sizeScaling?: number };
export const Wrapper = styled.section<WrapperProps>`
  background-image: linear-gradient(
    to right,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.secondary}
  );
  padding: 1rem 0rem;
  width: 100%;
  height: ${props => (props.sizeScaling ? props.sizeScaling * 6 : 6)}rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;
