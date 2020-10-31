import styled, { css } from 'styled-components'
import { Icon } from 'react-icons-kit'
import { color, mixColor, mixSize, parseSize, size } from '../../theme/helpers'

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

export const TabEmpty = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1px;
  box-shadow: inset 0 0 1px #aaa;
  border-radius: 1px;
  outline: none;
  border: none;
`

export const TabSeparator = styled(TabEmpty)`
  width: 100%;
`

export const TabText = styled(TabEmpty)`
  font-size: 0.9em;
`

export const Tab = styled(TabEmpty)`
  width: ${({ width }) => (width !== undefined ? parseSize(width) : '100%')};
  box-shadow: inset 0 0 3px #ccc;
  border-radius: 3px;
  background-color: ${color('bc.primary')};
  color: ${color('secondary')};
  cursor: pointer;

  &:hover,
  &:active,
  &[disabled] {
    background-color: ${color('bc.secondary')};
  }

  &:hover {
    box-shadow: inset 0 0 3px #fff;
    color: ${color('primary')};
  }

  &:active {
    box-shadow: inset 0 0 4px #fff;
    color: ${color('secondary')};
  }

  &[disabled] {
    cursor: default;
    box-shadow: inset 0 0 2px #fff9;
    background-color: ${color('bc.disabled')};
    color: ${color('disabled')};
  }

  ${({ active }) =>
    active
      ? css`
          background-color: ${color('bc.secondary')};
          box-shadow: inset 0 0 4px #fff;
          color: ${color('secondary')};
        `
      : ''}
`

export const StyledIcon = styled(Icon)`
  color: ${color('secondary')};
`

export const TabIcon = styled(Tab)`
  width: ${mixSize('width', 'tabButton')};
  max-width: ${mixSize('width', 'tabButton')};
  min-width: ${size('tabButton')};

  ${StyledIcon} {
    color: ${mixColor('color', 'secondary')};
  }

  &:hover {
    ${StyledIcon} {
      color: ${mixColor('color', 'primary')};
    }
  }

  &:active {
    ${StyledIcon} {
      color: ${mixColor('activeColor', 'secondary')};
    }
  }

  &[disabled] {
    ${StyledIcon} {
      color: ${color('disabled')};
    }
  }

  ${({ active }) =>
    active
      ? css`
          ${StyledIcon} {
            color: ${mixColor('activeColor', 'secondary')} !important;
          }
        `
      : ''}
`
