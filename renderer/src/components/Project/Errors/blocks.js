import { Icon } from 'react-icons-kit'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { color } from '../../../theme/helpers'
import StyledIcon from '../../../utils/StyledIcon'

export const Title = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

export const TitleLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${color('warn')};
  font-size: 1em;
`

export const CloseBtn = styled.button`
  opacity: 0.8;
  outline: none;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  ${StyledIcon} {
    color: ${color('warn')};
  }

  &:hover {
    box-shadow: 0 0 4px ${color('warn')};
  }

  &:active {
    box-shadow: 0 0 2px ${color('warn')};
  }
`

export const Body = styled.article`
  margin-left: 20px;
`

export const MessageContainer = styled.div`
  font-size: 0.95em;
  padding: 8px 0;
  color: ${color('secondary')};
  border-bottom: 1px solid;

  &:last-child {
    border-bottom: none;
  }
`

export const ServiceContainer = styled.div`
  width: 98%;
  margin: 8px auto;
  box-shadow: 0 -1px 3px ${color('warn')};
  padding: 4px 5px;

  &:hover {
    ${CloseBtn} {
      opacity: 1;
    }

    ${MessageContainer} {
      color: ${color('primary')};
    }
  }
`
