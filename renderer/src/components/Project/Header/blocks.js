import styled from 'styled-components'
import { color } from '../../../theme/helpers'
import cutProps from '../../../utils/cutProps'

const _RunnedText = styled.span`
  display: flex;
  align-self: center;
  margin: 0 5px 0 3px;
  color: ${color('primary')};
  width: 50px;
  overflow: hidden;
`

export const RunnedText = styled(cutProps(_RunnedText, ['loading']))`
  color: ${({ loading, error, runned, ...props }) =>
    color(loading ? 'disabled' : error ? 'warn' : runned ? 'runned' : 'disabled')(props)};
`
