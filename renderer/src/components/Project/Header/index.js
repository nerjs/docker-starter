import React from 'react'
import {
  TabCodeIcon,
  TabDeleteIcon,
  TabInfoIcon,
  TabPortIcon,
  Tabs,
  TabSection,
  TabSettingsIcon,
  TabWarnIcon,
} from '../../Tabs'
import TabSearch from '../../TabSearch'
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
          width={300}
          onChange={handleSearchChange}
          onShow={handleSearchShow}
          onHide={handleSearchHide}
        />
        <TabWarnIcon to={`/project/${projectId}/errors`} />
        <TabPortIcon to={`/project/${projectId}/ports`} />
        <TabInfoIcon to={`/project/${projectId}/info`} />
        <TabCodeIcon to={`/project/${projectId}/compose`} />
        <TabSettingsIcon to={`/project/${projectId}/settings`} />
        <TabDeleteIcon active={activeDelete} onClick={handleDelete} />
      </TabSection>
    </Tabs>
  )
}
