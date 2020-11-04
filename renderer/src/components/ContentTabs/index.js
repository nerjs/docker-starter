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
import TabSearch from '../TabSearch'

export default () => (
  <Tabs>
    <TabAddIcon title="Add service" />
    <TabRunnedIcon active />
    <TabText>Header text</TabText>
    <TabSearch
      left
      width={300}
      onChange={val => console.log('change', val)}
      onShow={() => console.log('show')}
      onHide={() => console.log('hide')}
    />
    <TabPortIcon />
    <TabInfoIcon />
    <TabCodeIcon />
    <TabSettingsIcon />
    <TabDeleteIcon />
  </Tabs>
)
