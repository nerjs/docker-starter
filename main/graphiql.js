const { app } = require('electron')
const logger = require('nlogs')(module)
const openWindow = require('../utils/openWindow')
require('./api')

logger.info('Start Graphiql!')

openWindow('graphiql')

app.on('window-all-closed', () => {
  app.quit()
})
