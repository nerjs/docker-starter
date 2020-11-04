import React from 'react'
import PortsList from '../PortsList'
import { Section, SectionBody, SectionHeader } from '../Sections'
import { TabEmpty, Tabs, TabSection } from '../Tabs'
import TabSearch from '../TabSearch'

export default () => (
  <Section>
    <SectionHeader>
      <Tabs>
        <TabSearch show right />
      </Tabs>
    </SectionHeader>
    <SectionBody>
      <PortsList />
    </SectionBody>
  </Section>
)
