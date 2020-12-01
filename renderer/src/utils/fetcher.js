import { ipcRenderer } from 'electron'
import gql from 'graphql-tag'
import { print } from 'graphql/language/printer'
import { Observable } from '@apollo/react-hooks'
import { getMainDefinition } from 'apollo-utilities'
import { GQL_CHANNEL_QUERY, GQL_CHANNEL_SUBSCRIBE } from '../../../constants/api'

export const isSubscription = ({ query }) => {
  return getMainDefinition(typeof query === 'string' ? gql(query) : query)?.operation === 'subscription'
}

export const prepareQuery = ({ query, ...data }) => ({
  ...data,
  query: typeof query === 'string' ? query : print(query),
})

export const execute = query =>
  new Observable(observer => {
    ipcRenderer
      .invoke(GQL_CHANNEL_QUERY, prepareQuery(query))
      .then(res => observer.next(res))
      .catch(e => observer.error(e))
      .finally(() => observer.complete())
  })

export const subscribe = query =>
  new Observable(observer => {
    let eventName, stoped, handler

    const unsubscribe = () => {
      if (eventName) {
        ipcRenderer.removeListener(eventName, handler)
        ipcRenderer.send(eventName, { type: 'unsubscribe' })
        observer.complete()
      }
      stoped = true
    }

    handler = (_, { type, error, result }) => {
      switch (type) {
        case 'next':
          observer.next(result)
          break
        case 'error':
          observer.error(error)
          unsubscribe()
          break
        case 'complete':
          unsubscribe()
          break
        default:
          const err = new Error('Incorrect type')
          err.type = type
          err.result = result
          err.error = error
          observer.error(err)
          unsubscribe()
      }
    }

    ipcRenderer.invoke(GQL_CHANNEL_SUBSCRIBE, prepareQuery(query)).then(({ subscribeEventName, errors }) => {
      if (stoped) return
      if (errors) {
        observer.error(errors)
        unsubscribe()
        return
      }
      eventName = subscribeEventName
      ipcRenderer.on(eventName, handler)
    })

    return unsubscribe
  })

export default query => (isSubscription(query) ? subscribe(query) : execute(query))
