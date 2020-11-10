import { InMemoryCache } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import RequestLink from './RequestLink'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new RequestLink('TEST'),
})
