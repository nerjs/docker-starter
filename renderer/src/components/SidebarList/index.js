import React, { useState } from 'react'
import { ListContainer } from './blocks'
import Item from './Item'

const items = [
  {
    id: '1',
    name: 'Test 1',
    services: 1,
    containers: 5,
  },
  {
    id: '2',
    name: 'Test 2 srgedtsssssssssssssddrgetgerg wsesferg',
    runned: true,
    services: 5,
    containers: 5,
  },
  {
    id: '3',
    name: 'Test 3',
    error: 'Test Error string',
    services: 8,
    containers: 10,
  },
]

export default () => {
  const [activeProject, setActiveProject] = useState('1')

  return (
    <ListContainer>
      {items.map(({ id, ...props }, i) => (
        <Item key={id} id={id} {...props} to={`/project/${id}`} />
      ))}
    </ListContainer>
  )
}
