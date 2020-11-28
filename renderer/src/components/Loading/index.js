import React from 'react'
import styled, { css, useTheme } from 'styled-components'
import { spinner2 } from 'react-icons-kit/icomoon/spinner2'
import StyledIcon from '../../utils/StyledIcon'
import { color } from '../../theme/helpers'
import spinCss from '../../utils/spinCss'

const positionCss = ({ position, center, ...props }) => {
  if (!position) return positionCss({ ...props, center, position: 'right bottom' })
  if (center) return positionCss({ ...props, position: 'center' })

  if (position === 'center')
    return css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  const top = position.includes('top')
  const bottom = position.includes('bottom')
  const left = position.includes('left')
  const right = position.includes('right')

  return css`
    ${top
      ? css`
          top: 5px;
        `
      : bottom
      ? css`
          bottom: 5px;
        `
      : ''}
    ${left
      ? css`
          left: 5px;
        `
      : right
      ? css`
          right: 5px;
        `
      : ''}
  `
}

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 10000;
  ${positionCss}

  ${StyledIcon} {
    color: ${color('secondary')};
    ${spinCss('1.5s')}
  }
`

export default ({ size, ...props }) => {
  const {
    sizes: { loading },
  } = useTheme()

  return (
    <LoadingContainer {...props}>
      <StyledIcon icon={spinner2} size={size || loading} />
    </LoadingContainer>
  )
}
