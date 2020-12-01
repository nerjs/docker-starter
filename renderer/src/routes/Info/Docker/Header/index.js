import React from 'react'
import Loading from '../../../../components/Loading'
import { TabLink, Tabs, TabText } from '../../../../components/Tabs'
import { BadgeAfter, BadgeBefore, BadgeCount, BadgeVersion } from './blocks'
import useHook from './useHook'

export default () => {
  const { loading, version, events, containers, images } = useHook()

  return (
    <Tabs>
      <TabText title={version && 'version'}>
        <BadgeVersion>{version}</BadgeVersion>
        {loading && <Loading />}
      </TabText>
      <TabLink to="/info/docker/containers">
        containers
        <BadgeBefore>{containers.running}</BadgeBefore>
        <BadgeAfter>{containers.count}</BadgeAfter>
        {loading && <Loading />}
      </TabLink>
      <TabLink to="/info/docker/images">
        images
        <BadgeBefore>{images.uses}</BadgeBefore>
        <BadgeAfter>{images.count}</BadgeAfter>
        {loading && <Loading />}
      </TabLink>
      <TabLink to="/info/docker/networks">
        networks
        {loading && <Loading />}
      </TabLink>
      <TabLink to="/info/docker/events">
        events
        {events > 0 && <BadgeCount>{events}</BadgeCount>}
        {loading && <Loading />}
      </TabLink>
    </Tabs>
  )
}
