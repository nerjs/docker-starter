import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { color, size } from '../../../theme/helpers'

export const InfoHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  font-size: 1.1em;
`

export const InfoHomeBlock = styled.div.attrs(({ to }) => ({ as: to ? Link : 'div' }))`
  background-color: ${color('bc.secondary')};
  position: relative;
  color: ${color('secondary')};
  margin: 10px 20px;
  padding: 10px 20px;
  display: block;
  text-decoration: none;
  border: 1px solid #111;
`

export const InfoHomeSection = styled.section`
  display: block;
  margin: 5px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const InfoHomeText = styled.span`
  margin: 0 2px;
  ${({ bold }) =>
    bold
      ? css`
          font-weight: bold;
        `
      : ''}

  font-size: ${({ small }) => (small ? '0.9em' : '1em')};
`

export const InfoHomeTextPrimary = styled(InfoHomeText)`
  color: ${color('primary')};
`

export const InfoHomeTextSecondary = styled(InfoHomeText)`
  color: ${color('secondary')};
`

export const InfoHomeVersion = styled(InfoHomeTextPrimary).attrs(() => ({ bold: true, small: true }))``
