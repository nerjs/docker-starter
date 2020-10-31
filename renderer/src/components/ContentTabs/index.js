import React from 'react'
import {
  TabAddIcon,
  TabCodeIcon,
  TabDeleteIcon,
  TabEmpty,
  TabInfoIcon,
  TabPortIcon,
  TabRunnedIcon,
  Tabs,
  TabSettingsIcon,
  TabText,
} from '../Tabs'

export default () => (
  <Tabs>
    <TabAddIcon title="Add service" />
    <TabRunnedIcon active />
    <TabText>Header text</TabText>
    <TabPortIcon />
    <TabInfoIcon />
    <TabCodeIcon />
    <TabSettingsIcon />
    <TabDeleteIcon />
  </Tabs>
)
