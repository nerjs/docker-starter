import React from 'react'
import useProjectErrors from '../../../hooks/useProjectErrors'
import { AlertContainer, AlertIconContainer, AlertMessage, AlertManyMessages, StyledIcon } from './blocks'
import { warning } from 'react-icons-kit/fa/warning'
import { useRouteMatch } from 'react-router-dom'

export default ({ projectId }) => {
  const [errors] = useProjectErrors(projectId)
  if (useRouteMatch(`/project/${projectId}/errors`)) return null

  if (!errors.length) return null

  return (
    <AlertContainer to={`/project/${projectId}/errors`}>
      <AlertIconContainer>
        <StyledIcon icon={warning} size={16} />
      </AlertIconContainer>
      <AlertMessage>
        {errors.length > 1 && <AlertManyMessages>({errors.length})</AlertManyMessages>}
        {errors[0].message}
      </AlertMessage>
    </AlertContainer>
  )
}
