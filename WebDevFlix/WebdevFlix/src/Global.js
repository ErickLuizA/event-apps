import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

* {
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

html, body {
  width: 100%;
  height: 100%;
}

#root {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.background};
  overflow-x: hidden;
}
`
