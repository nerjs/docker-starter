import { css, keyframes } from 'styled-components'
import { color, mixColor, mixSize, parseSize, size } from '../../../theme/helpers'
import { StyledIcon } from './wrappers'

export const tabEmptyCss = css`
  position: relative;
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
  text-decoration: none;
`

const tabActiveCss = css`
  background-color: ${color('bc.secondary')};
  box-shadow: inset 0 0 4px #fff;
  color: ${color('secondary')};
`

export const tabCss = css`
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

  ${({ active }) => (active ? tabActiveCss : '')}

  &.active {
    ${tabActiveCss}
  }
`

const tabIconActiveCss = css`
  ${StyledIcon} {
    color: ${mixColor('activeColor', 'secondary')} !important;
  }
`

export const tabIconCss = css`
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

  ${({ active }) => (active ? tabIconActiveCss : '')}

  &.active {
    ${tabIconActiveCss}
  }
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const tabSpinIconCss = css`
  ${StyledIcon} {
    animation: ${spin} 3s linear infinite;
  }
`
