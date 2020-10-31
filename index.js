require('dotenv').config()
const { app } = require('electron')

;(async () => {
  await app.whenReady()
  require('./main')

  if (process.env.NODE_ENV) require('./utils/winReload')
})()
