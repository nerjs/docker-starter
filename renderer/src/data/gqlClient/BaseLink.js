import { ApolloLink, Observable } from '@apollo/react-hooks'
import { ipcRenderer } from 'electron'
import TimeoutError from './TimeoutError'

export default class BaseLink extends ApolloLink {
  constructor(eventName, { replyTimeout = 10000 } = {}) {
    super()
    this.eventName = eventName
    this._replyCounter = 0
    this.ipc = ipcRenderer
    this.replyTimeout = replyTimeout
  }

  get replyCounter() {
    this._replyCounter = this._replyCounter >= Number.MAX_SAFE_INTEGER ? 1 : this._replyCounter + 1
    return this._replyCounter
  }

  getReplyChannel() {
    return `Reply_${this.eventName}_${Date.now()}_${this.replyCounter}`
  }

  fetch(data) {
    return new Promise((resolve, reject) => {
      const replyChannel = this.getReplyChannel()
      let tid, handler
      const clear = isTimer => (isTimer ? clearTimeout(tid) : this.ipc.removeListener(replyChannel, handler))

      handler = (_, args) => {
        clear(true)
        resolve(args)
      }

      tid = setTimeout(() => {
        clear(false)
        reject(new TimeoutError())
      }, this.replyTimeout)

      this.ipc.once(replyChannel, handler)
      this.ipc.send(this.eventName, { replyChannel, data })
    })
  }

  request(operation) {
    return new Observable(observe => observe.error(new Error('Not imlemented')))
  }
}
