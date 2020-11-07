import React from 'react'
import { RunnedText } from '../blocks'
import RunIcon from './RunIcon'
import useRunned from './useRunned'

export default ({ projectId }) => {
  const {
    runned,
    loading,
    error,
    hover,
    helperText,
    title,
    colorName,
    handleHover,
    handleBlur,
    handleRun,
    handleStop,
  } = useRunned(projectId)

  return (
    <>
      <RunIcon
        color={colorName}
        loading={loading}
        hover={hover}
        runned={runned}
        error={error}
        title={title}
        projectId={projectId}
        handleHover={handleHover}
        handleBlur={handleBlur}
        handleRun={handleRun}
        handleStop={handleStop}
      />
      <RunnedText loading={loading} error={error} runned={runned} colorName={colorName}>
        {helperText}
      </RunnedText>
    </>
  )
}
