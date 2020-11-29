import { ApolloLink } from '@apollo/react-hooks'
import fetcher from '../../utils/fetcher'

export default new ApolloLink(fetcher)
