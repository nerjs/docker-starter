require('dotenv').config()
const { app } = require('electron')
const electronIs = require('electron-is')

const { APP_TYPE } = process.env

;(async () => {
  await app.whenReady()

  switch (APP_TYPE) {
    case 'graphiql':
      require('./main/graphiql')
      break
    default:
      require('./main')
      break
  }

  if (electronIs.dev()) require('./utils/winReload')
})()
