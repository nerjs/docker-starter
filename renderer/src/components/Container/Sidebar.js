import React from 'react'
import { Section, SectionBody, SectionHeader } from '../Sections'
import { SidebarContainer } from './blocks'
import SidebarTabs from './SidebarTabs'

export default ({ children }) => (
  <SidebarContainer>
    <Section>
      <SectionHeader>
        <SidebarTabs />
      </SectionHeader>
      <SectionBody>{children}</SectionBody>
    </Section>
  </SidebarContainer>
)
