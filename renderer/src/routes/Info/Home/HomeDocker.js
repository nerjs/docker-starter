import React from 'react'
import { gql, useQuery } from '@apollo/react-hooks'
import {
  InfoHomeBlock,
  InfoHomeSection,
  InfoHomeSectionBlock,
  InfoHomeTextPrimary,
  InfoHomeTextSecondary,
  InfoHomeVersion,
} from './blocks'
import Loading from '../../../components/Loading'
import { AlertGqlErrors } from '../../../components/Alert'
import NotInstalled from '../Docker/NotInstalled'

const SCHEMA = gql`
  {
    docker {
      loaded
      info {
        version
        containers {
          count
          running
        }
        images {
          count
        }
      }
    }
  }
`

const Info = ({ version, containers, images }) => {
  return (
    <>
      <InfoHomeSection>
        <InfoHomeTextSecondary>Docker</InfoHomeTextSecondary>
        <InfoHomeTextSecondary small>version:</InfoHomeTextSecondary>
        <InfoHomeVersion>{version}</InfoHomeVersion>
      </InfoHomeSection>
      <InfoHomeSection>
        <InfoHomeTextSecondary>images</InfoHomeTextSecondary>
        <InfoHomeTextPrimary small>{images.count}</InfoHomeTextPrimary>,
        <InfoHomeTextSecondary>containers</InfoHomeTextSecondary>
        <InfoHomeTextPrimary small>
          {containers.running}/{containers.count}
        </InfoHomeTextPrimary>
      </InfoHomeSection>
    </>
  )
}

export default () => {
  const { loading, error, data } = useQuery(SCHEMA, {
    fetchPolicy: 'network-only',
  })

  return (
    <InfoHomeBlock to={data?.docker?.loaded ? '/info/docker' : undefined}>
      {data?.docker && (data.docker.loaded ? <Info {...data.docker.info} /> : <NotInstalled short />)}
      {error && <AlertGqlErrors error={error} />}
      {loading && (
        <>
          Docker:
          <Loading />
        </>
      )}
    </InfoHomeBlock>
  )
}
