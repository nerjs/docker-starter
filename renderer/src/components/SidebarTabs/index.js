import React from 'react'
import { Tabs, TabAddIcon, TabHelpIcon, TabInfoIcon, TabPortIcon, TabButton, TabSeparator, TabSection } from '../Tabs'

export default () => (
  <Tabs>
    <TabSection>
      <TabInfoIcon title="Info" />
      <TabHelpIcon active title="Help" />
      <TabPortIcon to="/ports/all" title="Открытые порты" />
    </TabSection>

    <TabAddIcon title="Добавить проэкт" width="100%" />
  </Tabs>
)
