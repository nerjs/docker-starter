import styled from 'styled-components'
import { color } from '../../../../theme/helpers'

export const Badge = styled.span`
  padding: 0 2px 0 1px;

  &:before {
    content: '/';
    margin-right: 2px;
  }

  &:before,
  &:after {
    color: ${color('secondary')};
  }

  &:first-child {
    margin-left: 2px;

    &:before {
      content: '';
      margin-right: 0;
    }
  }

  &:empty {
    padding: 0;

    &:after {
      content: '-';
    }
  }
`

export const BadgeBefore = styled(Badge)`
  color: ${color('runned')};
`
export const BadgeAfter = styled(Badge)`
  color: ${color('primary')};
`
export const BadgeCount = styled(Badge)`
  background-color: ${color('bc.secondary')};
  color: ${color('info')};
  padding: 2px 3px;
  border-radius: 20%;
  box-shadow: 0 0 4px #1119;
`

export const BadgeVersion = styled(Badge)`
  min-width: 20px;
  white-space: nowrap;
  margin: 0 5px 0 10px;
  font-weight: bold;
  color: ${color('primary')};

  &:empty {
    padding: 0;
    font-weight: normal;
    color: ${color('secondary')};

    &:after {
      content: '--.--.--';
    }
  }
`
