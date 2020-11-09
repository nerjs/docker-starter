import { Redirect, useParams } from 'react-router-dom'
import React, { useCallback } from 'react'
import { Body, ServiceContainer, Title, MessageContainer, TitleLink, CloseBtn } from './blocks'
import useProjectErrors from '../../../hooks/useProjectErrors'
import useGroupBy from '../../../utils/useGroupBy'
import StyledIcon from '../../../utils/StyledIcon'
import { bin } from 'react-icons-kit/ikons/bin'
import { SectionLoading } from '../../Sections'

export default () => {
  const { projectId } = useParams()
  const [errors, loading, { removeError }] = useProjectErrors(projectId)

  const groupedErrors = useGroupBy(errors, 'service', '_')

  const handleRemoveError = useCallback(
    service => {
      if (!groupedErrors[service]) return
      groupedErrors[service].forEach(removeError)
    },
    [removeError, groupedErrors],
  )

  const arrServices = Object.entries(groupedErrors).sort(([service]) => (service === '_' ? -1 : 0))

  if (!arrServices.length) return <Redirect to={`/project/${projectId}`} />

  return (
    <>
      {arrServices.map(([service, serviceErrors]) => (
        <ServiceContainer key={service}>
          <Title>
            <TitleLink to={`/project/${projectId}${service === '_' ? '' : `?service=${service}`}`}>
              {service === '_' ? 'Общие ошибки проэкта' : `Ошибки сервиса ${service}`}
            </TitleLink>
            <CloseBtn onClick={() => handleRemoveError(service)}>
              <StyledIcon icon={bin} />
            </CloseBtn>
          </Title>
          <Body>
            {serviceErrors.map(({ message }, i) => (
              <MessageContainer key={`${i}_${message}`}>{message}</MessageContainer>
            ))}
          </Body>
        </ServiceContainer>
      ))}
      {loading && <SectionLoading />}
    </>
  )
}
