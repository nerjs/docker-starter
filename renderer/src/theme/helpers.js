import lodashGet from 'lodash.get'

export const color = name => ({ theme: { colors } }) => lodashGet(colors, name)

export const parseSize = sz => (typeof sz === 'number' ? `${sz}px` : sz)
export const parseColor = (col, props) => (`${col}`.startsWith('#') ? col : color(col)(props)) || col

export const size = name => ({ theme: { sizes } }) => parseSize(lodashGet(sizes, name))

const createWhen = fn => (field, ifName, elseName) => props => fn(props[field] ? ifName : elseName)(props)
const noopPrepare = v => v
const createMix = (fn, prepare = noopPrepare) => (field, name) => props =>
  props[field] !== undefined ? prepare(props[field], props) : fn(name)(props)

export const whenColor = createWhen(color)
export const mixColor = createMix(color, parseColor)

export const whenSize = createWhen(size)
export const mixSize = createMix(size, parseSize)
