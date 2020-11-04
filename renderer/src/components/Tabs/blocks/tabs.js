import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import React from 'react'
import { tabCss, tabEmptyCss, tabIconCss } from './tabsCss'

export const TabEmpty = styled.div`
  ${tabEmptyCss}
`

export const TabSeparator = styled(TabEmpty)`
  width: 100%;
`

export const TabText = styled(TabEmpty)`
  font-size: 0.9em;
`

export const Tab = styled(TabEmpty)`
  ${tabCss}
`

export const TabLink = styled(({ active, activeColor, ...props }) => <NavLink {...props} />)`
  ${tabEmptyCss}

  ${tabCss}
`

export const TabIcon = styled(Tab)`
  ${tabIconCss}
`

export const TabLinkIcon = styled(TabLink)`
  ${tabIconCss}
`
