import React, { useCallback, useState } from 'react'
import { TabAddIcon } from '../../Tabs'

export const WIDTH_BTN = 120

export default ({ projectId }) => {
  const [active, setActive] = useState(false)
  const handleActive = useCallback(() => setActive(a => !a), [setActive])

  return <TabAddIcon title="Добавить сервис" active={active} onClick={handleActive} width={WIDTH_BTN} />
}
