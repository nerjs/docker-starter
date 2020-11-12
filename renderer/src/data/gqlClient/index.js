import { InMemoryCache } from '@apollo/react-hooks'
import ApolloClient from 'apollo-client'
import RequestLink from './RequestLink'
import { GQL_CHANNEL } from '../../../../constants/api'

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new RequestLink(GQL_CHANNEL),
})
