import styled from 'styled-components'
import { color, size } from '../../theme'

export const RootContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  color: ${color('primary')};
  background-color: ${color('bc.primary')};
  font-size: ${size('main')};
`

export const SidebarContainer = styled.div`
  width: 20%;
  min-width: 200px;
  overflow: auto;
  background-color: ${color('bc.secondary')};
  border-right: 1px solid #111;
`

export const ContentContainer = styled.div`
  width: 100%;
  overflow: auto;
  background-color: ${color('bc.primary')};
`
