import { useCallback, useEffect, useRef, useState } from 'react'

const TAB_WIDTH = 30

export default ({ inProcess, finalStyle, iconBounds, left, right, width, onChange }) => {
  const [positions, setPositions] = useState({ width: width + TAB_WIDTH, inputWidth: width })
  const layerRef = useRef()
  const inputRef = useRef()

  const handleChange = useCallback(
    e => {
      if (!onChange || inProcess || !finalStyle) return
      onChange(e.target.value)
    },
    [onChange, inProcess, finalStyle],
  )

  useEffect(() => {
    if (!layerRef.current || !iconBounds.width) return
    const layerBounds = layerRef.current.getBoundingClientRect()
    const newPos = { width: width + TAB_WIDTH }

    if (newPos.width > layerBounds.width) {
      if (left) newPos.right = 0
      if (right) newPos.left = 0
      newPos.width = layerBounds.width
    } else if (left) {
      newPos.right = iconBounds.right - ((iconBounds.width || 0) - layerBounds.width - layerBounds.x)
    } else if (right) {
      newPos.left = iconBounds.left - layerBounds.x
    }

    if (finalStyle && layerBounds.width < (newPos.right || newPos.left || 0) + newPos.width) {
      delete newPos.right
      delete newPos.left
      newPos[right ? 'left' : 'right'] = layerBounds.width - newPos.width
    }

    newPos.inputWidth = newPos.width - TAB_WIDTH

    if (!finalStyle) {
      newPos.width = TAB_WIDTH
    }

    setPositions(newPos)
  }, [iconBounds, left, right, width, finalStyle, layerRef, setPositions])

  useEffect(() => {
    if (!inputRef.current) return
    if (!inProcess && finalStyle) inputRef.current.focus()
  }, [inProcess, finalStyle, inputRef])

  return { positions, layerRef, inputRef, handleChange, tabWidth: TAB_WIDTH }
}
