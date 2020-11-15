const { app } = require('electron')

;(async () => {
  await app.whenReady()
  require('./main')
})()
