const path = require('path')
const merge = require('merge')
const config = require('../../config')
const getDisplay = require('./getDisplay')

module.exports = (name, props, initiator) => {
  const display = getDisplay(initiator)

  return merge.recursive(
    {},
    config.windows.base,
    config.windows[name],
    props,
    {
      filePath: path.join(config.paths.views, `${name}.html`),
    },
    display && display.bounds
      ? {
          x: display.bounds.x,
          y: display.bounds.y,
        }
      : {},
  )
}
