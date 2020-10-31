import styled from 'styled-components'
import { color, size } from '../../theme'
import scrollCss from '../../utils/scrollCss'

export const Section = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const SectionHeader = styled.header`
  width: 100%;
  height: ${size('headerHeight')};
  overflow: hidden;
  background-color: ${color('bc.secondary')};
  border-bottom: 1px solid #111;
`

export const SectionBody = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  ${scrollCss}
`
