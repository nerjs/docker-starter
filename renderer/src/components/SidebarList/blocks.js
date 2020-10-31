import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { color, size, whenColor } from '../../theme'

export const ListContainer = styled.div`
  width: 99%;
  margin: 5px auto;
  font-size: ${size('sidebar')};
`

export const ListItem = styled(NavLink)`
  position: relative;
  display: block;
  text-decoration: none;
  margin: 2px;
  background-color: ${color('bc.primary')};
  padding: 3px 5px;
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

export const ListItemPrimary = styled.div`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1em;
  color: ${color('primary')};
`

export const ListItemSecondary = styled.div`
  font-size: 0.8em;
  margin-top: 3px;
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  color: ${color('secondary')};
`

export const ListItemError = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: ${color('warn')};
`

export const ListItemBadge = styled.span`
  padding: 0 5px;
`

export const ListItemRunning = styled(ListItemBadge)`
  width: 100%;
  color: ${whenColor('runned', 'runned', 'disabled')};
`

export const ListItemServices = styled(ListItemBadge)`
  color: ${color('service')};
`

export const ListItemContainers = styled(ListItemBadge)`
  color: ${color('container')};
`
