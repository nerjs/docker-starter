import React from 'react'
import SidebarTabs from '../SidebarTabs'
import SidebarList from '../SidebarList'
import { Section, SectionBody, SectionHeader } from '../Sections'

export default () => (
  <Section>
    <SectionHeader>
      <SidebarTabs />
    </SectionHeader>
    <SectionBody>
      <SidebarList />
    </SectionBody>
  </Section>
)
