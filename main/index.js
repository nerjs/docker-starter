const { app } = require('electron')
const logger = require('nlogs')(module)
const { MainWindow } = require('../renderer')
const Tray = require('./Tray')

logger.info('Start App!')

const tray = new Tray()
const win = MainWindow()
win.route('test/qwerty')

setTimeout(() => win.route('/zzz'), 5000)

app.on('window-all-closed', () => {
  app.quit()
})
