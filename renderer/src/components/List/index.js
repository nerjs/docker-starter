import React from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { warning } from 'react-icons-kit/fa/warning'
import { ListItemWarn, ListItem, ListItemPrimaryBase } from './blocks'

export { ListContainer as List, ListItemPrimary as ItemPrimary, ListItemSecondary as ItemSecondary } from './blocks'

export const Item = ({ children, ...props }) => (
  <ListItem {...props} as={props.to ? NavLink : 'div'}>
    <ListItemPrimaryBase>{children}</ListItemPrimaryBase>
  </ListItem>
)

export const ItemWarning = ({ message }) => (
  <ListItemWarn title={message}>
    <Icon icon={warning} />
  </ListItemWarn>
)
