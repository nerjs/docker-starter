import React from 'react'

export default props => (
  <>
    Ports list <br />
    <pre>{JSON.stringify(props, null, 4)}</pre>
  </>
)
