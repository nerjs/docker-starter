import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AddService from '../AddService'
import { TabBackIcon } from '../../Tabs'

export default ({ projectId }) => {
  return (
    <Switch>
      <Route path={`/project/${projectId}`} exact render={() => <AddService projectId={projectId} />} />
      <Route path="*" render={() => <TabBackIcon exact to={`/project/${projectId}`} title="Back" />} />
    </Switch>
  )
}
