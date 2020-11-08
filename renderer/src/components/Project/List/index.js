import React from 'react'
import { useParams } from 'react-router-dom'

export default () => (
  <div>
    <pre>{JSON.stringify(useParams(), null, 4)}</pre>

    {Array(200)
      .fill(null)
      .map((_, i) => (
        <div key={i}>{i}</div>
      ))}
  </div>
)
