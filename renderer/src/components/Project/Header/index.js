import React from 'react'
import { TabCodeIcon, TabDeleteIcon, TabInfoIcon, TabPortIcon, Tabs, TabSection, TabSettingsIcon } from '../../Tabs'
import TabSearch from '../../TabSearch'
import { RunnedText } from './blocks'
import CoreBtn from './CoreBtn'
import Runned from './Runned'
import useHeader from './useHeader'

export default ({ projectId, ...props }) => {
  const { activeDelete, handleDelete, handleSearchChange, handleSearchHide, handleSearchShow } = useHeader({
    projectId,
    ...props,
  })

  return (
    <Tabs>
      <TabSection>
        <CoreBtn projectId={projectId} />
        <Runned projectId={projectId} />
      </TabSection>

      <TabSection>
        <TabSearch
          activeRoutePath={`/project/${projectId}`}
          left
          show
          width={300}
          onChange={handleSearchChange}
          onShow={handleSearchShow}
          onHide={handleSearchHide}
        />
        <TabPortIcon to={`/project/${projectId}/ports`} />
        <TabInfoIcon to={`/project/${projectId}/info`} />
        <TabCodeIcon to={`/project/${projectId}/compose`} />
        <TabSettingsIcon to={`/project/${projectId}/settings`} />
        <TabDeleteIcon active={activeDelete} onClick={handleDelete} />
      </TabSection>
    </Tabs>
  )
}
