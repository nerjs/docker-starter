import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { color } from '../../../../theme/helpers'

export const Container = styled.div`
  font-size: 1.1em;
  margin: 2px;
  padding: 3px 5px;
  /* background-color: ${color('bc.secondary')}; */
  color: ${color('secondary')};
`

export const Info = styled.div`
  &:first-child {
    margin-bottom: 10px;
  }
`

export const DockerLink = styled.a.attrs(() => ({ target: '_blank' }))`
  font-size: 0.9em;
  color: ${color('primary')};
  font-weight: bold;
  text-decoration: none;
`

export const InfoLink = styled(Link)`
  color: ${color('primary')};
  font-weight: bold;
  text-decoration: none;
  font-size: 0.9em;
`

export const Code = styled.code`
  display: inline-block;
  margin-left: 15px;
  margin-top: 10px;
  color: ${color('primary')};
  letter-spacing: 2px;
  line-height: 2;
  font-size: 0.9em;
`
