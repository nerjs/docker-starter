import React from 'react'
import { AlertError, AlertGqlErrors } from '../Alert'
import Loading from '../Loading'
import { Section, SectionBody } from './blocks'

export const SectionLoading = props => (
  <Section>
    <SectionBody>
      <Loading {...props} />
    </SectionBody>
  </Section>
)

export const SectionError = ({ error, ...props }) => {
  const Alert = error.graphQLErrors || error.networkError ? AlertGqlErrors : AlertError

  return (
    <Section>
      <SectionBody>
        <Alert error={error} {...props} />
      </SectionBody>
    </Section>
  )
}
