import { useCallback, useEffect, useReducer, useState } from 'react'
import reducer, { ADD_ERROR, CLEAR_ERRORS, REMOVE_ERROR } from './reducer'

const defaultErrors = [
  {
    message: 'Core project',
  },
  {
    project: '1',
    service: '222',
    message: `Lorem Ipsum 1 - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.`,
  },
  {
    project: '1',
    message: 'test',
  },
  {
    project: '1',
    service: '222',
    message: 'message project 2',
  },
]

export default () => {
  const [errors, _dispatch] = useReducer(reducer, defaultErrors)
  const [loading, setLoading] = useState(false)

  const dispatch = useCallback(
    (...args) => {
      setLoading(true)
      _dispatch(...args)
    },
    [_dispatch, setLoading],
  )

  const addError = useCallback(payload => dispatch({ type: ADD_ERROR, payload }), [dispatch, setLoading])
  const removeError = useCallback(payload => dispatch({ type: REMOVE_ERROR, payload }), [dispatch, setLoading])
  const clearErrors = useCallback(() => dispatch({ type: CLEAR_ERRORS }), [dispatch, setLoading])

  useEffect(() => {
    if (!loading) return

    const tid = setTimeout(() => setLoading(false), 1000)

    return () => clearTimeout(tid)
  }, [loading, setLoading])

  return { errors, loading, addError, removeError, clearErrors }
}
