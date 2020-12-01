import React from 'react'
import { gql, useQuery } from '@apollo/react-hooks'
import NotInstalled from './NotInstalled'
import { Section, SectionLoading } from '../../../components/Sections'
import { SectionError } from '../../../components/Sections'
import Loading from '../../../components/Loading'
import InfoDocker from './InfoDocker'
import useTitle from '../../../hooks/useTitle'

const DOCKER_LOADED = gql`
  {
    docker {
      loaded
    }
  }
`

export default () => {
  useTitle('Docker info')

  const { loading, error, data } = useQuery(DOCKER_LOADED, {
    fetchPolicy: 'cache-and-network',
  })

  const loaded = data?.docker?.loaded

  if (!data?.docker && loading) return <SectionLoading />

  if (error) return <SectionError error={error} />

  return (
    <Section>
      {loaded ? <InfoDocker /> : <NotInstalled full />}

      {loading && <Loading />}
    </Section>
  )
}
