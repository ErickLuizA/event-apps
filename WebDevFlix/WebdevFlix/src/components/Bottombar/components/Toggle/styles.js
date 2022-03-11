import styled from 'styled-components'

export const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.foreground};
  border: none;
  outline: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  vertical-align: middle;
  margin-left: 2em;

  svg {
    height: auto;
    width: 100%;
  }

  @media(min-width: 768px) {
    display: none;
  }
`
