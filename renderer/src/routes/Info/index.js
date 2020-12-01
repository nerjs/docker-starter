import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Content, Root, Sidebar } from '../../components/Container'
import { List, Item } from '../../components/List'
import Docker from './Docker'
import DockerCompose from './DockerCompose'
import Home from './Home'
import Ports from './Ports'
import System from './System'
import useTitle from '../../hooks/useTitle'

export default () => {
  useTitle('Info')
  return (
    <Root>
      <Sidebar>
        <List>
          <Item to="/info/docker">docker</Item>
          <Item to="/info/docker-compose">docker-compose</Item>
          <Item to="/info/ports">ports</Item>
          <Item to="/info/system">system</Item>
        </List>
      </Sidebar>
      <Content>
        <Switch>
          <Route path="/info/docker" component={Docker} />
          <Route path="/info/docker-compose" component={DockerCompose} />
          <Route path="/info/ports" component={Ports} />
          <Route path="/info/system" component={System} />
          <Route path="*" component={Home} />
        </Switch>
      </Content>
    </Root>
  )
}
