import styled from 'styled-components'

export const FooterBase = styled.footer`
  background: transparent;
  border-top: 2px solid ${({ theme }) => theme.foreground};
  padding: 1em;
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media(max-width: 768px) {
    margin-bottom: 60px;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    &:hover {
      color: ${({ theme }) => theme.hover};
    }
  }
`
