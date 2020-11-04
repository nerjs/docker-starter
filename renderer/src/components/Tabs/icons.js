import React from 'react'
import { StyledIcon, TabIcon, TabLinkIcon } from './blocks'
import { infoCircle } from 'react-icons-kit/fa/infoCircle'
import { questionCircle } from 'react-icons-kit/fa/questionCircle'
import { plusCircle } from 'react-icons-kit/fa/plusCircle'
import { feed } from 'react-icons-kit/icomoon/feed' // runned
import { cog } from 'react-icons-kit/ikons/cog' // settings
import { twoVertical } from 'react-icons-kit/entypo/twoVertical'
import { embed2 } from 'react-icons-kit/icomoon/embed2'
import { bin } from 'react-icons-kit/ikons/bin'
import { search } from 'react-icons-kit/icomoon/search'
import { close } from 'react-icons-kit/fa/close'

export const TabIconWrapper = React.forwardRef(({ icon, ...props }, ref) => {
  const Wrapper = props.to ? TabLinkIcon : TabIcon

  return (
    <Wrapper ref={ref} {...props}>
      <StyledIcon size={16} icon={icon} />
    </Wrapper>
  )
})

export const TabInfoIcon = props => <TabIconWrapper {...props} icon={infoCircle} />

export const TabHelpIcon = props => <TabIconWrapper {...props} icon={questionCircle} />

export const TabAddIcon = props => <TabIconWrapper {...props} icon={plusCircle} width={120} />

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
