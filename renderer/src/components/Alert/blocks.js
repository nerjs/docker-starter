import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import StyledIcon from '../../utils/StyledIcon'
import { color, getSize, size } from '../../theme/helpers'

export const AlertContainer = styled.div.attrs(({ to }) => ({ as: to ? Link : 'div' }))`
  display: flex;
  ${({ sticky, top }) =>
    sticky
      ? css`
          position: sticky;
          top: ${top ? `${top}px` : 0};
        `
      : ''}
  
  background-color: ${color('bc.secondary')};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: ${size('alert.font')};
  padding: 5px 5px 5px 0;
  margin: 5px 0;


  ${({ warn, info }) => css`
    color: ${color(warn ? 'warn' : info ? 'info' : 'secondary')};
    border: 1px solid ${color(warn ? 'warn' : info ? 'info' : 'disabled')};

    ${StyledIcon} {
      color: ${color(warn ? 'warn' : info ? 'info' : 'disabled')} !important;
    }
  `}
`

export const AlertIconContainer = styled.div`
  width: 40px;
  text-align: center;
`

export const AlertMessage = styled.div`
  /* border: 1px solid; */
  display: block;
  width: 100%;
  overflow: hidden;
  margin-left: 5px;
  ${({ rowsInMessage, ...props }) =>
    rowsInMessage
      ? css`
          display: -webkit-box;
          -webkit-line-clamp: ${typeof rowsInMessage === 'number' ? rowsInMessage : getSize('alert.rows')(props)};
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        `
      : ''}
`
