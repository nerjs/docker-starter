import React from 'react'
import { Section, SectionBody, SectionLoading } from '../Sections'
import { RootContainer, ContentContainer } from './blocks'

export default () => (
  <RootContainer>
    <ContentContainer>
      <Section>
        <SectionBody>
          <SectionLoading />
        </SectionBody>
      </Section>
    </ContentContainer>
  </RootContainer>
)
