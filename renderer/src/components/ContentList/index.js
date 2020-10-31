import React from 'react'
import { useLocation } from 'react-router-dom'

export default () => {
  const loc = useLocation()
  return (
    <div>
      Content list
      <br />
      {location.href}
      <br />
      <pre>{JSON.stringify(loc, null, 4)}</pre>
    </div>
  )
}
