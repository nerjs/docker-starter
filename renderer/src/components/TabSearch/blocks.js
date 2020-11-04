import styled, { css } from 'styled-components'
import { color } from '../../theme'
import { Tab, TabCloseIcon, TabSearchIcon } from '../Tabs'

const AbsoluteBlock = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
`

export const SearchSimpleLayer = styled(AbsoluteBlock)`
  left: 0;
  right: 0;
  z-index: 10;
  background-color: #3333;
`

const _SearchLayer = styled(SearchSimpleLayer)`
  transition: 0.5s background-color;
`
export const SearchLayer = styled(_SearchLayer)`
  background-color: ${({ finalStyle }) => (finalStyle ? '#24292edd' : '#0000')};
`

export const SearchContainer = styled(AbsoluteBlock).attrs(({ left, right, width }) => ({ style: { width, left, right } }))`
  top: 0;
  bottom: 0;
  z-index: 20;
  overflow: hidden;
  color: #000;
  padding: 0;
  margin: 0;
  width: 35px;
  transition: 0.5s width;
  border-radius: ${({ left }) => (left ? '5px 0 0 5px' : '0 5px 5px 0')};

  ${({ inProcess, left }) =>
    inProcess
      ? css`
          border-${left ? 'right' : 'left'}: 2px solid #111;
          border-radius: 10px;
        `
      : ''}

  ${Tab} {
    padding: 0;
    margin: 0;
  }
`

export const InnerSearchIcon = styled(TabCloseIcon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ leftSide }) =>
    leftSide
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}
`

export const InputContainer = styled(AbsoluteBlock).attrs(({ width }) => ({ style: { width } }))`
  top: 4px;
  bottom: 3px;

  ${({ leftSide, tabWidth }) =>
    leftSide
      ? css`
          left: ${tabWidth}px;
        `
      : css`
          right: ${tabWidth}px;
        `}
`

export const Input = styled.input.attrs(({ width }) => ({ style: { width } }))`
  background-color: yellow;
  background-color: ${color('bc.input')};
  color: ${color('primary')};
  box-shadow: none;
  outline: none;
  border: 2px solid #111;
  height: 100%;
  border-radius: ${({ leftSide }) => (leftSide ? '0 5px 5px 0' : '5px 0 0 5px')};
  padding: 0 5px 0 5px;
  font-size: 0.9em;
  letter-spacing: 1px;
`
