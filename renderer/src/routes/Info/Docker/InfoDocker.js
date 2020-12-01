import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { SectionBody, SectionHeader } from '../../../components/Sections'
import Header from './Header'
import Containers from './Containers'
import Images from './Images'
import Networks from './Networks'
import Events from './Events'

export default () => (
  <>
    <SectionHeader>
      <Header />
    </SectionHeader>
    <SectionBody>
      <Switch>
        <Route path="/info/docker/containers" component={Containers} />
        <Route path="/info/docker/images" component={Images} />
        <Route path="/info/docker/networks" component={Networks} />
        <Route path="/info/docker/events" component={Events} />

        <Redirect to="/info/docker/containers" />
      </Switch>
    </SectionBody>
  </>
)
