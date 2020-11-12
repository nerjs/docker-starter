const { app } = require('electron')
const logger = require('nlogs')(module)
const { mainWindow } = require('../renderer')
const Tray = require('./Tray')
require('./api')

logger.info('Start App!')

const tray = new Tray()
const win = mainWindow()

app.on('window-all-closed', () => {
  app.quit()
})
