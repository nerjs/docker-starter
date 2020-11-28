import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { color, size, whenColor } from '../../theme'

export const ListContainer = styled.div`
  width: 99%;
  margin: 8px auto;
  font-size: ${size('sidebar')};
`

export const ListItem = styled.div`
  position: relative;
  display: block;
  text-decoration: none;
  margin: 2px;
  background-color: ${color('bc.primary')};
  padding: 5px;
  border: 1px solid #141414;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: ${color('bc.secondary')};
  }

  &:active {
    box-shadow: inset 0 0 5px #999;
  }

  &.active {
    cursor: default;
    box-shadow: inset 0 0 5px #999;
    background-color: ${color('bc.secondary')};
    border-radius: 3px;

    &:hover {
      background-color: ${color('bc.secondary')};
    }
  }
`

export const ListItemPrimaryBase = styled.div`
  max-width: 100%;
  font-size: 1em;
  color: ${color('primary')};
`

export const ListItemPrimary = styled(ListItemPrimaryBase)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 2px 0;
`

export const ListItemSecondary = styled.div`
  font-size: 0.8em;
  margin-top: 3px;
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  color: ${color('secondary')};
`

export const ListItemWarn = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: ${color('warn')};
`
