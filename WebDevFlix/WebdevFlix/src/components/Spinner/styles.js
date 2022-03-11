import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
export const Rotate = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    animation: ${rotate} 2s linear infinite;
    fill: ${({ theme }) => theme.text};
    width: 10em;
    height: 10em;
  }
`
