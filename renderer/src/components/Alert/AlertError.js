import React from 'react'
import Alert from './Alert'

const isDev = process.env.NODE_ENV !== 'production'

export default ({ error, ...props }) => (
  <Alert warn {...props}>
    {isDev && <b>[ {error.name} ] </b>}
    {error.message}

    {isDev && (
      <>
        <br />
        {Object.keys(error).length > 0 && (
          <>
            <br />
            <pre>{JSON.stringify(error, null, 4)}</pre>
          </>
        )}
        {error.stack && (
          <>
            <br />
            <pre>{error.stack}</pre>
          </>
        )}
      </>
    )}
  </Alert>
)
