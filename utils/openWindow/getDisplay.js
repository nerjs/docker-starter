const { screen } = require('electron')

module.exports = initiator => {
  if (initiator && initiator.getBounds && typeof initiator.getBounds === 'function')
    return screen.getDisplayNearestPoint(initiator.getBounds())

  return screen.getDisplayNearestPoint(screen.getCursorScreenPoint())
}
