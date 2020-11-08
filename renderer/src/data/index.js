import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Theme } from '../theme'
import AppErrors from './AppErrors'

export default ({ children }) => (
  <Theme>
    <AppErrors>
      <HashRouter basename="/">{children}</HashRouter>
    </AppErrors>
  </Theme>
)
