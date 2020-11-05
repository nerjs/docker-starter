import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { TabSearchIcon } from '../Tabs'
import InputBlock from './InputBlock'
import useSearchSwitch from './useSearchSwitch'
import useUserControls from './useUserControls'

const TabSearch = ({
  left,
  right,
  width = 200,
  onChange,
  onShow,
  onHide,
  ctrlf = true,
  escape = true,
  activeRoutePath,
  ...props
}) => {
  const { iconRef, show, inProcess, finalStyle, switchShow, setShow, iconBounds } = useSearchSwitch(props.show)

  useUserControls({ startShow: props.show, show, switchShow, setShow, onShow, onHide, ctrlf, escape, activeRoutePath })

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

export default ({ activeRoutePath, ...props }) => {
  if (!activeRoutePath) return <TabSearch {...props} />

  return (
    <Switch>
      <Route path={activeRoutePath} exact render={() => <TabSearch {...props} activeRoutePath={activeRoutePath} />} />
      <Route paath="*" render={() => <TabSearchIcon disabled />} />
    </Switch>
  )
}
