import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Theme } from '../theme'

export default ({ children }) => (
  <Theme>
    <HashRouter basename="/">{children}</HashRouter>
  </Theme>
)
