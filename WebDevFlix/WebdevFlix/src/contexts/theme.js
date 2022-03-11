import { createContext, useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import { dark, light } from '../components/Themes'

export const Switch = createContext()

const SwitchProvider = ({ children }) => {
  const [theme, setTheme] = useState(dark)

  useEffect(() => {
    const storagedTheme = localStorage.getItem('theme')
    if (storagedTheme) {
      setTheme(JSON.parse(storagedTheme))
    }
  }, [])

  const toggle = () => {
    if (theme === dark) {
      setTheme(light)
      localStorage.setItem('theme', JSON.stringify(light))
    } else {
      setTheme(dark)
      localStorage.setItem('theme', JSON.stringify(dark))
    }
  }

  return (
    <Switch.Provider value={{ theme, toggle }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Switch.Provider>
  )
}

export default SwitchProvider
