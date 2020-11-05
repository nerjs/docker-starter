import React, { useCallback, useState } from 'react'
import { TabAddIcon } from '../../Tabs'

export default ({ projectId }) => {
  const [active, setActive] = useState(false)
  const handleActive = useCallback(() => setActive(a => !a), [setActive])

  return <TabAddIcon active={active} onClick={handleActive} />
}
