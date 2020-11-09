import { useCallback, useEffect, useState } from 'react'
import lodashGroupby from 'lodash.groupby'

export default (arr, field, replacementField) => {
  const iteratee = useCallback(obj => (obj && obj[field]) || replacementField, [field, replacementField])
  const [result, setResult] = useState(() => lodashGroupby(arr, iteratee))

  useEffect(() => {
    if (!field) return
    setResult(lodashGroupby(arr, iteratee))
  }, [arr, iteratee, setResult])

  return result
}
