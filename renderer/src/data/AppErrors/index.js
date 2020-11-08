import React, { createContext } from 'react'
import useContextAppErrors from './useContextAppErrors'

export const AppErrorsContext = createContext({})

export default ({ children }) => {
  const value = useContextAppErrors()
  return <AppErrorsContext.Provider value={value}>{children}</AppErrorsContext.Provider>
}
