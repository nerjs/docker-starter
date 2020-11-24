const { app } = require('electron')
const logger = require('nlogs')(module)
const Tray = require('./Tray')
const openWindow = require('../utils/openWindow')
require('./api')

logger.info('Start App!')

const tray = new Tray()
const win = openWindow('main')

app.on('window-all-closed', () => {
  app.quit()
})
