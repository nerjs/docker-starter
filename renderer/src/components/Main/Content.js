import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddProjectContent from '../AddProjectContent'
import Ports from '../Ports'
import Project from '../Project'

export default () => (
  <Switch>
    <Route path="/project/:projectId" component={Project} />
    <Route path="/ports" component={Ports} />
    <Route path="*" component={AddProjectContent} />
  </Switch>
)
