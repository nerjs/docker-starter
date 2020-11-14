const { app } = require('electron')
const logger = require('nlogs')(module)
const { graphiqlWindow } = require('../renderer')
require('./api')

logger.info('Start App!')

graphiqlWindow()

app.on('window-all-closed', () => {
  app.quit()
})
