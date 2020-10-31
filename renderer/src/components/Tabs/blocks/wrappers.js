import Icon from 'react-icons-kit'
import styled from 'styled-components'
import { size, color } from '../../../theme/helpers'

export const Tabs = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${size('tabs')};
`

export const TabSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

export const StyledIcon = styled(Icon)`
  color: ${color('secondary')};
`
