import React from 'react'
import { TabPowerOffIcon, TabPowerOnIcon, TabRunnedIcon, TabWaitIcon, TabWarnIcon } from '../../../Tabs'

export default ({
  projectId,
  color,
  loading,
  hover,
  runned,
  error,
  handleHover,
  handleBlur,
  handleRun,
  handleStop,
  title,
}) => {
  const handlers = { color, title, onMouseEnter: handleHover, onMouseLeave: handleBlur }

  if (loading) return <TabWaitIcon {...handlers} />
  if (error) return <TabWarnIcon {...handlers} to={`/project/${projectId}/errors`} />
  if (hover && runned) return <TabPowerOffIcon {...handlers} onClick={handleStop} />
  if (hover && !runned) return <TabPowerOnIcon {...handlers} onClick={handleRun} />

  return <TabRunnedIcon {...handlers} disabled={!runned} active={runned} />
}
