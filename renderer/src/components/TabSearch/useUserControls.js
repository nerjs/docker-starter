import { useEffect, useState } from 'react'
import useCtrlF from '../../hooks/useCtrlF'
import useEsc from '../../hooks/useEsc'

export default ({ startShow, show, switchShow, setShow, onShow, onHide, ctrlf, escape }) => {
  const [prevShow, setPrevShow] = useState(!!startShow)

  useEffect(() => {
    if (show === prevShow) return
    setPrevShow(show)
    if (show && onShow) {
      onShow()
    } else if (!show && onHide) {
      onHide()
    }
  }, [prevShow, setPrevShow, show, onShow, onHide])

  useEsc(() => {
    if (!escape || !show) return
    setShow(false)
  }, [escape, show, setShow])

  useCtrlF(() => {
    if (!ctrlf || show) return
    setShow(true)
  }, [ctrlf, show, setShow])
}
