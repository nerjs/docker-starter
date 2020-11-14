import React from 'react'
import Graphiql from 'graphiql'
const { getMainDefinition } = require('apollo-utilities')
import { ipcRenderer } from 'electron'
import gql from 'graphql-tag'
import { Observable } from '@apollo/react-hooks'
import { GQL_CHANNEL_QUERY, GQL_CHANNEL_SUBSCRIBE } from '../../constants/api'
import render from './utils/render'

const isSubscription = ({ query }) => {
  return getMainDefinition(gql(query))?.operation === 'subscription'
}

const fetcher = query => {
  console.log({ query }, isSubscription(query))
  if (!isSubscription(query)) return ipcRenderer.invoke(GQL_CHANNEL_QUERY, query)

  return new Observable(observer => {
    console.log('sub')
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

    ipcRenderer.invoke(GQL_CHANNEL_SUBSCRIBE, query).then(({ subscribeEventName }) => {
      console.log({ subscribeEventName })
      if (stoped) return
      eventName = subscribeEventName
      ipcRenderer.on(eventName, handler)
    })

    return unsubscribe
  })
}

export default render(() => <Graphiql fetcher={fetcher} />)
