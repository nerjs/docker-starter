import React, { useCallback } from 'react'
import { Icon } from 'react-icons-kit'
import { warning } from 'react-icons-kit/fa/warning'
import {
  ListItem,
  ListItemContainers,
  ListItemError,
  ListItemPrimary,
  ListItemRunning,
  ListItemSecondary,
  ListItemServices,
} from './blocks'

export default ({ id, active, name, runned, error, services, containers, to }) => {
  return (
    <ListItem title={name} to={to} activeClassName="active">
      <ListItemPrimary>{name}</ListItemPrimary>
      <ListItemSecondary>
        <ListItemRunning runned={runned}>runned</ListItemRunning>
        <ListItemServices title="Services">{services}</ListItemServices>
        <ListItemContainers title="Containers">{containers}</ListItemContainers>
      </ListItemSecondary>
      {error && (
        <ListItemError title={error}>
          <Icon icon={warning} />
        </ListItemError>
      )}
    </ListItem>
  )
}
