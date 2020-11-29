import React from 'react'
import { AlertContainer, AlertIconContainer, AlertMessage } from './blocks'
import { warning } from 'react-icons-kit/fa/warning'
import StyledIcon from '../../utils/StyledIcon'

export default ({ warn, info, rows, children, ...props }) => (
  <AlertContainer {...props} info={info} warn={warn}>
    <AlertIconContainer>
      <StyledIcon icon={warning} />
    </AlertIconContainer>
    <AlertMessage rowsInMessage={rows}>{children}</AlertMessage>
  </AlertContainer>
)
