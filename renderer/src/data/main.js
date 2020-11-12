import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { Theme } from '../theme'
import AppErrors from './AppErrors'
import gqlClient from './gqlClient'

export default ({ children }) => (
  <Theme>
    <ApolloProvider client={gqlClient}>
      <AppErrors>
        <HashRouter basename="/">{children}</HashRouter>
      </AppErrors>
    </ApolloProvider>
  </Theme>
)
