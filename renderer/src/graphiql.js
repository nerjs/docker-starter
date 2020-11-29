import React from 'react'
import Graphiql from 'graphiql'
import render from './utils/render'
import fetcher from './utils/fetcher'

export default render(() => <Graphiql fetcher={fetcher} />)
