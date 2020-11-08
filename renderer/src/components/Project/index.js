import React from 'react'
import { Route, Switch, useParams } from 'react-router-dom'
import { Section, SectionBody, SectionHeader } from '../Sections'
import Errors from './Errors'
import Header from './Header'
import Info from './Info'
import Ports from './Ports'
import ComposeFile from './ComposeFile'
import Settings from './Settings'
import List from './List'
import Alert from './Alert'

export default () => {
  const { projectId } = useParams()

  return (
    <Section>
      <SectionHeader>
        <Header projectId={projectId} />
      </SectionHeader>
      <SectionBody>
        <Alert projectId={projectId} />
        <Switch>
          <Route path="/project/:projectId/errors" component={Errors} />
          <Route path="/project/:projectId/ports" component={Ports} />
          <Route path="/project/:projectId/info" component={Info} />
          <Route path="/project/:projectId/compose" component={ComposeFile} />
          <Route path="/project/:projectId/settings" component={Settings} />
          <Route path="/project/:projectId" exact component={List} />
        </Switch>
      </SectionBody>
    </Section>
  )
}
