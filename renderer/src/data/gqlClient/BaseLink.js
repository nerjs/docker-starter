import { ApolloLink, Observable } from '@apollo/react-hooks'
// import IpcFetcher from '../../utils/ipcFetcher'

export default class BaseLink extends ApolloLink {
  constructor(eventName, { replyTimeout = 20000 } = {}) {
    super()
    // this.ipcFetcher = new IpcFetcher(eventName, { replyTimeout })
  }

  async fetch(data) { // fff
    // return this.ipcFetcher.fetch(data)
  }

  request(operation) {
    return new Observable(observe => observe.error(new Error('Not imlemented')))
  }
}
