const logger = require('nlogs')(module)
const devTools = require('../devTools')
const parseProps = require('./parseProps')
const { BrowserWindow } = require('electron')

module.exports = (name, props, initiator) =>
  new Promise((resolve, reject) => {
    logger.debug('Open window', name)
    const { devtools, show, center, filePath, route, ...options } = parseProps(name, props, initiator)

    let win

    try {
      win = new BrowserWindow({ center, ...options, show: false })
      if (devtools) devTools(win)
      win.loadFile(filePath, { hash: route || '/' })
    } catch (err) {
      logger.error(err)
      if (win) win.destroy()
      return reject(err)
    }

    win.route = pathRoute => win.webContents.executeJavaScript(`location.assign('#${pathRoute}');`)

    win.once('ready-to-show', () => {
      if (center) win.center()
      if (show !== false) win.show()
      resolve(win)
    })
  })
