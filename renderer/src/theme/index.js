import React from 'react'
import { ThemeProvider } from 'styled-components'
import colors from './colors'
import sizes from './sizes'
import fontFamily from './fontFamily'
import GlobalStyles from './GlobalStyles'
export * from './helpers'

const theme = {
  colors,
  sizes,
  fontFamily,
}

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
)
