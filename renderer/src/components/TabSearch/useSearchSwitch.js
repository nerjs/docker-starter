import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrevious, useWindowSize } from 'react-use'

export default startShow => {
  const firstRenderRef = useRef(true)
  const [show, setShow] = useState(!!startShow)
  const [iconBounds, setIconBounds] = useState({ left: 0, right: 0 })
  const [inProcess, setInProcess] = useState(false)
  const [finalStyle, setFinalStyle] = useState(!!startShow)
  const iconRef = useRef()
  const { width } = useWindowSize()

  const switchShow = useCallback(() => {
    if (inProcess) return
    setShow(s => !s)
  }, [inProcess, setShow])

  useEffect(() => {
    if (!iconRef.current) return
    const bounds = iconRef.current.getBoundingClientRect()
    setIconBounds({
      left: bounds.x,
      right: width - bounds.x - bounds.width,
      width,
    })
  }, [width, setIconBounds])

  useEffect(() => {
    console.log('useEffect', show, firstRenderRef.current)
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }
    setInProcess(true)
    setFinalStyle(!show)

    let tid = setTimeout(() => {
      setFinalStyle(!!show)
      tid = setTimeout(() => setInProcess(false), 500)
    }, 50)

    return () => clearTimeout(tid)
  }, [show, firstRenderRef, setInProcess, setFinalStyle])

  return { show: inProcess || finalStyle, inProcess, finalStyle, iconRef, switchShow, setShow, iconBounds }
}
