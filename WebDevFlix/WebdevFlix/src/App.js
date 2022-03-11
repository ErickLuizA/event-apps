import React from 'react'

import { GlobalStyle } from './Global'

import Routes from './routes'
import SwitchProvider from './contexts/theme'

function App () {
  return (
    <SwitchProvider>
      <GlobalStyle />
      <Routes />
    </SwitchProvider>
  )
}

export default App
