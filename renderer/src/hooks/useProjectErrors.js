import { useCallback, useState } from 'react'
import useFilterArray from '../utils/useFilterArray'
import useAppErrors from './useAppErrors'

export default projectId => {
  const [errors, loading, { addError: appAddError, removeError: appRemoveError }] = useAppErrors()

  const projectErrors = useFilterArray(errors, err => err.project === projectId, [projectId])
  const addError = useCallback(err => appAddError({ project: projectId, ...err }), [appAddError, projectId])
  const removeError = useCallback(err => appRemoveError({ project: projectId, ...err }), [appRemoveError, projectId])
  const clearErrors = useCallback(() => projectErrors.forEach(appRemoveError), [projectErrors, appRemoveError])

  return [projectErrors, loading, { addError, removeError, clearErrors }]
}
