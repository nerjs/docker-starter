import React, { useCallback } from 'react'
import Graphiql from 'graphiql'
import IpcFetcher from './utils/ipcFetcher'
import { GQL_CHANNEL } from '../../constants/api'

const ipcFetcher = new IpcFetcher(GQL_CHANNEL)

export default () => {
  const fetcher = useCallback(query => ipcFetcher.fetch(query))

  return <Graphiql fetcher={fetcher} />
}
