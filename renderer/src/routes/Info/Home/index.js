import React from 'react'
import { InfoHomeContainer } from './blocks'
import HomeDocker from './HomeDocker'
import HomeDockerCompose from './HomeDockerCompose'
import HomePorts from './HomePorts'
import HomeSystem from './HomeSystem'
import { Section, SectionBody } from '../../../components/Sections'

export default () => (
  <Section>
    <SectionBody>
      <InfoHomeContainer>
        <HomeDocker />
        <HomeDockerCompose />
        <HomePorts />
        <HomeSystem />
      </InfoHomeContainer>
    </SectionBody>
  </Section>
)
