import { useCallback, useEffect, useState } from 'react'

export default (arr, filterFn, filterDeps = []) => {
  const [result, setResult] = useState(arr)
  const filter = useCallback(filterFn, filterDeps)

  useEffect(() => setResult(arr.filter(filter)), [arr, filter, setResult])

  return result
}
