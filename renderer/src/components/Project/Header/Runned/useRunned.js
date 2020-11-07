import { useCallback, useState } from 'react'
import useRunnedProject from '../../../../hooks/useRunnedProject'

export default projectId => {
  const { runned, loading, error, ...handlersRun } = useRunnedProject(projectId)
  const [hover, setHover] = useState(false)
  const handleHover = useCallback(() => setHover(true), [setHover])
  const handleBlur = useCallback(() => setHover(false), [setHover])

  const title = loading ? 'Loading...' : error ? 'Has errors!' : runned ? 'Stop' : 'Run'
  const helperText = loading ? 'wait' : error ? 'warning' : runned ? 'runned' : 'stoped'

  return { runned, loading, error, hover, title, helperText, handleHover, handleBlur, ...handlersRun }
}
