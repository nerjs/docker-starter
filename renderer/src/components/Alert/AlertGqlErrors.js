import React, { Fragment } from 'react'
import Alert from './Alert'

const isDev = process.env.NODE_ENV !== 'production'

export default ({ error, ...props }) => {
  if (!error) return null
  const { message, graphQLErrors, networkError } = error
  const count = (graphQLErrors || []).length + (networkError ? 1 : 0)

  if (!message && !count) return <Alert warn>Empty error</Alert>

  return (
    <Alert warn {...props}>
      {message && count > 1 && (
        <>
          <b>{message}</b>
          <br />
        </>
      )}
      {graphQLErrors.map(({ message, name, path }, i) => (
        <Fragment key={`${name}-${path.join('.')}`}>
          {((message && count > 1) || i > 0) && <br />}
          {isDev && (
            <b>
              [{name} ({path.join('.')})]{' '}
            </b>
          )}
          {message}
          <br />
        </Fragment>
      ))}

      {networkError && (
        <>
          {count > 1 && <br />}
          {isDev && <b>[{(networkError.name && `NetworkError:${networkError.name}`) || 'networkError'}] </b>}
          {networkError.message}
        </>
      )}
    </Alert>
  )
}
