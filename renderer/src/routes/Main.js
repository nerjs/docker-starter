import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Help from './Help'
import Info from './Info'
import Settings from './Settings'
import Projects from './Projects'

export default () => (
  <Switch>
    <Route path="/help" component={Help} />
    <Route path="/info" component={Info} />
    <Route path="/settings" component={Settings} />
    <Route path="/projects" component={Projects} />
    <Route path="*" render={() => <Redirect to="/projects" />} />
  </Switch>
)
