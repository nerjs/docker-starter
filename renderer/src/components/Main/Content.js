import React from 'react'
import ContentList from '../ContentList'
import ContentTabs from '../ContentTabs'
import { Section, SectionBody, SectionHeader } from '../Sections'

export default () => (
  <Section>
    <SectionHeader>
      <ContentTabs />
    </SectionHeader>
    <SectionBody>
      <ContentList />
    </SectionBody>
  </Section>
)
