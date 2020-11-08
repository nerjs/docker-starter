import Icon from 'react-icons-kit'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { color, getSize, size } from '../../../theme'

export const StyledIcon = styled(Icon)`
  color: ${color('warn')};
`

export const AlertContainer = styled(Link)`
  display: flex;
  position: sticky;
  top: 0;
  background-color: ${color('bc.secondary')};
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${color('warn')};
  border: 1px solid ${color('warn')};
  font-size: ${size('alert.font')};
  padding: 5px 5px 5px 0;
`

export const AlertIconContainer = styled.div`
  width: 40px;
  text-align: center;
`

export const AlertManyMessages = styled.span`
  margin-right: 5px;
  font-size: 1.1em;
  font-weight: bold;
  text-shadow: 0 0 15px #fff;
`

export const AlertMessage = styled.div`
  /* border: 1px solid; */
  display: block;
  width: 100%;
  overflow: hidden;
  margin-left: 5px;
  display: -webkit-box;
  -webkit-line-clamp: ${getSize('alert.rows')};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`
