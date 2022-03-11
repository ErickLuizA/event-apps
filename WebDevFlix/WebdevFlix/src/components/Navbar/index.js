/* eslint-disable */
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Nav, LogoWrapper, Logo, FlexContainer, Button } from './styles'

import logo from '../../assets/logo.png'
import darklogo from '../../assets/darklogo.png'

import { Switch } from '../../contexts/theme'

import Toggle from '../../components/Toggle'

function Navbar () {
  const location = useLocation().pathname
  const { theme } = useContext(Switch)

  return (
    <Nav>
      <FlexContainer>
        <LogoWrapper>
          {theme.background === '#000'
            ? <Link to='/'>
              <Logo src={darklogo} alt='WebDevFlix logo' />
              </Link> // eslint-disable-line
            : <Link to='/'>
              <Logo src={logo} alt='WebDevFlix logo' />
            </Link>}
        </LogoWrapper>
        <div>
          <Toggle />
          <Link to='/newepisode'>
            {location !== '/newepisode'
              ? <Button>
                New Episode
              </Button> : null}
          </Link>
        </div>
      </FlexContainer>
    </Nav>
  )
}

export default Navbar
