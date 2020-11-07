import React from 'react'
import { StyledIcon, TabIcon, TabLinkIcon, TabSpinIcon } from './blocks'
import { infoCircle } from 'react-icons-kit/fa/infoCircle'
import { questionCircle } from 'react-icons-kit/fa/questionCircle'
import { plusCircle } from 'react-icons-kit/fa/plusCircle'
import { chevronCircleLeft } from 'react-icons-kit/fa/chevronCircleLeft'
import { feed } from 'react-icons-kit/icomoon/feed' // runned
import { cog } from 'react-icons-kit/ikons/cog' // settings
import { twoVertical } from 'react-icons-kit/entypo/twoVertical'
import { embed2 } from 'react-icons-kit/icomoon/embed2'
import { bin } from 'react-icons-kit/ikons/bin'
import { search } from 'react-icons-kit/icomoon/search'
import { close } from 'react-icons-kit/fa/close'
import { powerOff } from 'react-icons-kit/fa/powerOff'
import { playCircleO } from 'react-icons-kit/fa/playCircleO'
import { repeat_2 } from 'react-icons-kit/ikons/repeat_2'
import { warning } from 'react-icons-kit/fa/warning'

export const TabIconWrapper = React.forwardRef(({ icon, spin, ...props }, ref) => {
  const Wrapper = spin ? TabSpinIcon : props.to ? TabLinkIcon : TabIcon

  return (
    <Wrapper ref={ref} {...props}>
      <StyledIcon size={16} icon={icon} />
    </Wrapper>
  )
})

export const TabInfoIcon = props => <TabIconWrapper {...props} icon={infoCircle} />

export const TabHelpIcon = props => <TabIconWrapper {...props} icon={questionCircle} />

export const TabAddIcon = props => <TabIconWrapper width={120} {...props} icon={plusCircle} />
export const TabBackIcon = props => <TabIconWrapper width={120} {...props} icon={chevronCircleLeft} />

export const TabPortIcon = props => <TabIconWrapper {...props} icon={twoVertical} color="ports" activeColor="active.ports" />

export const TabRunnedIcon = props => (
  <TabIconWrapper
    {...props}
    icon={feed}
    color="runned"
    activeColor="active.runned"
    disabled={props.disabled || props.active}
  />
)

export const TabSettingsIcon = props => <TabIconWrapper {...props} icon={cog} />

export const TabCodeIcon = props => <TabIconWrapper {...props} icon={embed2} />

export const TabDeleteIcon = props => <TabIconWrapper {...props} icon={bin} color="remove" activeColor="active.remove" />

export const TabSearchIcon = React.forwardRef((props, ref) => <TabIconWrapper ref={ref} {...props} icon={search} />)

export const TabCloseIcon = props => <TabIconWrapper {...props} icon={close} />

export const TabPowerOffIcon = props => <TabIconWrapper {...props} icon={powerOff} color="remove" activeColor="remove" />

export const TabPowerOnIcon = props => <TabIconWrapper {...props} icon={playCircleO} color="runned" activeColor="runned" />

export const TabWaitIcon = props => <TabIconWrapper {...props} icon={repeat_2} spin disabled />

export const TabWarnIcon = props => <TabIconWrapper {...props} icon={warning} color="warn" activeColor="warn" />
