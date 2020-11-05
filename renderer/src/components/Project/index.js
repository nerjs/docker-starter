import React from 'react'
import { useParams } from 'react-router-dom'
import ContentList from '../ContentList'
import ContentTabs from '../ContentTabs'
import { Section, SectionBody, SectionHeader } from '../Sections'
import Header from './Header'

export default () => {
  const { projectId } = useParams()

  return (
    <Section>
      <SectionHeader>
        <Header projectId={projectId} />
      </SectionHeader>
      <SectionBody>
        <ContentList />
      </SectionBody>
    </Section>
  )
}
