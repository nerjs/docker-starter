import React, { Fragment } from 'react'
import Alert from './Alert'
import { AlertErrorNamePrimary, AlertErrorNameSecondary } from './blocks'

const isDev = process.env.NODE_ENV !== 'production'

const getParamsLine = (path, locations) => {
  const arr = []

  if (path && Array.isArray(path)) arr.push(path.join('.'))
  if (locations && Array.isArray(locations)) arr.push(...locations.map(({ line, column }) => `${line}:${column}`))

  return arr
}

const ErrorName = ({ name, path, locations }) => {
  if (!isDev) return null

  return (
    <AlertErrorNamePrimary>
      {name}
      {getParamsLine(path, locations).map(str => (
        <AlertErrorNameSecondary key={str}>{str}</AlertErrorNameSecondary>
      ))}
    </AlertErrorNamePrimary>
  )
}

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
      {graphQLErrors.map(({ message, name, path, locations }, i) => (
        <Fragment key={`${name}-${getParamsLine(path, locations).join('.')}`}>
          {((message && count > 1) || i > 0) && <br />}
          <ErrorName name={name} path={path} locations={locations} />
          {message}
          <br />
        </Fragment>
      ))}

      {networkError && (
        <>
          {count > 1 && <br />}
          <ErrorName name={networkError.name || 'networkError'} />
          {networkError.message}
        </>
      )}
    </Alert>
  )
}
