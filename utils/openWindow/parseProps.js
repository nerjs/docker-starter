const path = require('path')
const config = require('../../config')
const getDisplay = require('./getDisplay')

module.exports = (name, props, initiator) => {
  const display = getDisplay(initiator)

  merge.recursive(
    {},
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
