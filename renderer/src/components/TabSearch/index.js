import React from 'react'
import { TabSearchIcon } from '../Tabs'
import InputBlock from './InputBlock'
import useSearchSwitch from './useSearchSwitch'
import useUserControls from './useUserControls'

export default ({ left, right, width = 200, onChange, onShow, onHide, ctrlf = true, escape = true, ...props }) => {
  const { iconRef, show, inProcess, finalStyle, switchShow, setShow, iconBounds } = useSearchSwitch(props.show)

  useUserControls({ startShow: props.show, show, switchShow, setShow, onShow, onHide, ctrlf, escape })

  return (
    <>
      <TabSearchIcon ref={iconRef} onClick={switchShow} />
      {show && (
        <InputBlock
          inProcess={inProcess}
          finalStyle={finalStyle}
          iconBounds={iconBounds}
          switchShow={switchShow}
          left={left}
          right={right}
          width={width}
          onChange={onChange}
        />
      )}
    </>
  )
}
