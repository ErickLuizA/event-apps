import styled from 'styled-components'

import OriginalButton from '../Button'

export const Nav = styled.nav`
  padding: 1em 0 0.5em 0;
  border-bottom: 2px solid ${({ theme }) => theme.foreground};
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: auto;
  max-width: 1360px;

  @media screen and (max-width: 768px) {
    display: block;
  }
`

export const LogoWrapper = styled.div`
  max-width: 200px;
  @media screen and (max-width: 768px) {
    margin: auto;
  }
`

export const Logo = styled.img`
  width: 100%;
`

export const Button = styled(OriginalButton)`
  margin-left: 1em;

  @media(max-width: 768px) {
    display: none;
  }
`
