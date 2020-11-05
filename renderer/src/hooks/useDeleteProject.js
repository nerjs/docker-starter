import { useCallback, useEffect, useState } from 'react'

export default projectId => {
  const [active, setActive] = useState(false)

  const handleDelete = useCallback(() => setActive(true), [projectId, setActive])

  useEffect(() => {
    let tid
    if (active) {
      tid = setTimeout(() => setActive(false), 3000)
    }

    return () => {
      if (tid) clearTimeout(tid)
    }
  }, [active, setActive])

  return { active, handleDelete }
}
