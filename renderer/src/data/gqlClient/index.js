import { InMemoryCache } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import link from './link'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      // errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
})
