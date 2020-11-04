import React from 'react'
import { TabSearchIcon } from '../Tabs'
import { InnerSearchIcon, Input, InputContainer, SearchContainer, SearchLayer } from './blocks'
import useSearch from './useSearch'

export default props => {
  const { inProcess, finalStyle, switchShow } = props
  const {
    layerRef,
    inputRef,
    handleChange,
    positions: { left, right, width, inputWidth },
  } = useSearch(props)

  return (
    <>
      <SearchLayer finalStyle={finalStyle} onClick={switchShow} ref={layerRef} />
      {(left !== undefined || right !== undefined) && (
        <SearchContainer width={width} left={left} right={right}>
          <InputContainer leftSide={!!props.right} width={inputWidth}>
            <Input width={inputWidth} leftSide={!!props.right} ref={inputRef} onInput={handleChange} />
          </InputContainer>
          <InnerSearchIcon disabled={inProcess} leftSide={!!props.right} onClick={switchShow} />
        </SearchContainer>
      )}
    </>
  )
}
