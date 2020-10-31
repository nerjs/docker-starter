import { useEffect, useState } from 'react'

export default newTitle => {
  const [currentTitle] = useState(document.title)
  useEffect(() => {
    document.body = newTitle

    return () => {
      document.body = currentTitle
    }
  }, [])
}
