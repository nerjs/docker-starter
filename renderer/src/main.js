import React from 'react'
import render from './utils/render'
import DataWrapper from './data/main'
import Main from './routes/Main'

render(() => (
  <DataWrapper>
    <Main />
  </DataWrapper>
))
