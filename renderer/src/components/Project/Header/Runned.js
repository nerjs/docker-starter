import React, { useCallback, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import useRunnedProject from '../../../hooks/useRunnedProject'
import { TabPowerOffIcon, TabPowerOnIcon, TabRunnedIcon, TabWaitIcon } from '../../Tabs'
import { RunnedText } from './blocks'

const TabIcon = ({ color, loading, hover, runned, handleHover, handleBlur, handleRun, handleStop }) => {
  const handlers = { color, onMouseEnter: handleHover, onMouseLeave: handleBlur }

  if (loading) return <TabWaitIcon {...handlers} />
  if (hover && runned) return <TabPowerOffIcon {...handlers} onClick={handleStop} />
  if (hover && !runned) return <TabPowerOnIcon {...handlers} onClick={handleRun} />

  return <TabRunnedIcon {...handlers} disabled={!runned} active={runned} />
}

export default ({ projectId }) => {
  const { runned, loading, handleRun, handleStop } = useRunnedProject(projectId)
  const [hover, setHover] = useState(false)

  // TODO: реализовать блокировку при неправильном роуте
  const { isExact } = useRouteMatch(`/project/${projectId}`)
  const handleHover = useCallback(() => setHover(true), [setHover])
  const handleBlur = useCallback(() => setHover(false), [setHover])
  const runnedTxt = loading ? 'wait' : runned ? (hover ? 'stop' : 'runned') : hover ? 'run' : 'stoped'
  const colorName = loading ? 'disabled' : runned ? (hover ? 'remove' : 'runned') : hover ? 'runned' : 'disabled'

  return (
    <>
      <TabIcon
        color={colorName}
        loading={loading}
        hover={hover}
        runned={runned}
        handleHover={handleHover}
        handleBlur={handleBlur}
        handleRun={handleRun}
        handleStop={handleStop}
      />
      <RunnedText colorName={colorName}>{runnedTxt}</RunnedText>
    </>
  )
}
