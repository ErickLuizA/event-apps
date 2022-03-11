import { Link, useLocation } from 'react-router-dom'

import { Container } from './styles'

import Button from '../../components/Button'
import Toggle from './components/Toggle'

const Bottombar = () => {
  const location = useLocation().pathname

  return (
    <Container>
      {location !== '/newepisode'
        ? <>
          <Link to='/newepisode'>
            <Button> New Episode </Button>
          </Link>
          <Toggle />
          </> // eslint-disable-line 
        : <Toggle />}

    </Container>
  )
}

export default Bottombar
