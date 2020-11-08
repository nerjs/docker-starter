import { useContext } from 'react'
import { AppErrorsContext } from '../data/AppErrors'

export default () => {
  const { errors, loading, ...handlers } = useContext(AppErrorsContext)

  console.log(errors)

  return [errors, loading, handlers]
}
