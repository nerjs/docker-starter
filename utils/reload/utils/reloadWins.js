const debounce = require('debounce')
const logger = require('nlogs')(module)

const getBW = () => {
  try {
    return require('electron').BrowserWindow
  } catch (e) {
    logger.error(e)
    return null
  }
}

module.exports = debounce(() => {
  const BrowserWindow = getBW()
  if (!BrowserWindow) return

  const wins = BrowserWindow.getAllWindows().filter(win => !win.isDestroyed())
  if (!wins.length) return
  logger.debug(`Reload ${wins.length} windows`)
  wins.forEach(win => win.reload())
}, 100)
