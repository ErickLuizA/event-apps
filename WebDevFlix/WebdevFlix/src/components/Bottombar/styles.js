import styled from 'styled-components'

export const Container = styled.div`
  @media(min-width: 768px) {
    display: none;
  }

  background-color: ${({ theme }) => theme.background};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0;
  text-align: center;
`
