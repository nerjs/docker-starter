import styled from 'styled-components'
import { color, mixColor } from '../../../theme/helpers'

export const RunnedText = styled.span`
  display: flex;
  align-self: center;
  margin: 0 5px;
  color: ${mixColor('colorName', 'secondary')};
`
