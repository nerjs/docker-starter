import React from 'react'

const getProps = (props = {}, fields) => {
  const nProps = { ...props }
  fields.forEach(fieldName => {
    delete nProps[fieldName]
  })
  return nProps
}

const cutProps = (Component, fields) => {
  if (typeof fields === 'string') return cutProps(Component, [fields])
  if (!Array.isArray(fields) || !fields.length) return Component
  return props => <Component {...getProps(props, fields)} />
}

export default cutProps
