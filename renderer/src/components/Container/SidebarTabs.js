import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Tabs, TabAddIcon, TabHelpIcon, TabInfoIcon, TabSection, TabSettingsIcon, TabForwardIcon } from '../Tabs'

const ProjectTab = () => (
  <Switch>
    <Route path="/projects" render={() => <TabAddIcon title="Add project" />} />
    <Route path="*" render={() => <TabForwardIcon to="/projects" title="Projects" />} />
  </Switch>
)

export default () => (
  <Tabs>
    <TabSection>
      <TabHelpIcon to="/help" title="Help" />
      <TabInfoIcon to="/info" title="Info" />
      <TabSettingsIcon to="/settings" title="Settings" />
    </TabSection>

    <ProjectTab />
  </Tabs>
)
