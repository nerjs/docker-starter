const { BrowserWindow } = require('electron')
const path = require('path')
const merge = require('merge')
const config = require('../config')
const devTools = require('./devTools')

const viewsDir = path.join(__dirname, '..', 'renderer', 'views')

module.exports = (viewName, props) =>
  new Promise((resolve, reject) => {
    const { devtools, show, ...options } = merge.recursive(
      {},
      {
        width: 500,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
          nodeIntegration: true,
        },
      },
      config.windows[viewName] || {},
      props || {},
    )

    let win
    try {
      win = new BrowserWindow({ ...options, show: false })

      if (devtools) devTools(win)

      win.loadFile(path.join(viewsDir, `${viewName}.html`), { hash: '/' })
    } catch (e) {
      return reject(e)
    }

    win.route = pathRoute => win.webContents.executeJavaScript(`location.assign('#${pathRoute}');`)

    win.once('ready-to-show', () => {
      if (show !== false) win.show()
      resolve(win)
    })
  })
