import { useContext } from 'react'
import { FaAdjust } from 'react-icons/fa'

import { ToggleContainer } from './styles'

import { Switch } from '../../../../contexts/theme'

const Toggle = () => {
  const { toggle } = useContext(Switch)

  return (
    <ToggleContainer onClick={toggle}>
      <FaAdjust />
    </ToggleContainer>
  )
}

export default Toggle
