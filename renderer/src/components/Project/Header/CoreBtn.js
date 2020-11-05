import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddService from '../AddService'
import { TabAddIcon } from '../../Tabs'

export default ({ projectId }) => {
  return (
    <Switch>
      <Route path={`/project/${projectId}`} exact render={() => <AddService projectId={projectId} />} />
      <Route path="*" render={() => <TabAddIcon to={`/project/${projectId}`} />} />
    </Switch>
  )
}
