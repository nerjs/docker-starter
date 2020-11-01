import React from 'react'
import { RootContainer, SidebarContainer, ContentContainer } from './blocks'
import Sidebar from './Sidebar'
import Content from './Content'

export default () => {
  return (
    <RootContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ContentContainer>
        <Content />
      </ContentContainer>
    </RootContainer>
  )
}
