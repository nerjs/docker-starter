import styled from 'styled-components'
import React from 'react'
import { color, size } from '../../theme'
import scrollCss from '../../utils/scrollCss'
import StyledIcon from '../../utils/StyledIcon'
import { spinner2 } from 'react-icons-kit/icomoon/spinner2'
import spinCss from '../../utils/spinCss'

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
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  ${scrollCss}
`

const SectionLoadingContainer = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;

  ${StyledIcon} {
    color: ${color('secondary')};
    ${spinCss('1.5s')}
  }
`

export const SectionLoading = () => (
  <SectionLoadingContainer>
    <StyledIcon icon={spinner2} />
  </SectionLoadingContainer>
)
