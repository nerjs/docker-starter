import { useCallback, useEffect, useState } from 'react'
import useProjectErrors from './useProjectErrors'

export default projectId => {
  const [runned, setRunned] = useState(false)
  const [loading, setLoading] = useState(true)
  const [[error]] = useProjectErrors(projectId)

  const handleRun = useCallback(() => setRunned(true), [setRunned])
  const handleStop = useCallback(() => setRunned(false), [setRunned])

  useEffect(() => {
    setLoading(true)
    const tid = setTimeout(() => setLoading(false), 2000)

    return () => clearTimeout(tid)
  }, [runned, setLoading])

  return { error, runned, loading, handleRun, handleStop }
}
