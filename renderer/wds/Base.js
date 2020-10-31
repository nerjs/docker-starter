const { BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const merge = require('merge')
const Events = require('events')
const devTools = require('../../utils/devTools')

module.exports = (viewName, props = {}) => {
  const win = new BrowserWindow(
    merge.recursive(
      {},
      {
        width: 500,
        height: 400,
        show: false,
        type: 'desctop',
        autoHideMenuBar: true,
        title: 'Base',
        webPreferences: {
          nodeIntegration: true,
        },
      },
      props,
    ),
  )

  if (process.env.NODE_ENV !== 'production') devTools(win)

  // win.loadURL(
  //   url.format({
  //     protocol: 'file',
  //     slashes: true,
  //     pathname: path.join(__dirname, '..', 'views', `${viewName}.html`) + '#/test/hash',
  //   }),
  // )

  win.loadFile(path.join(__dirname, '..', 'views', `${viewName}.html`), { hash: '/' })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.route = pathRoute => win.webContents.executeJavaScript(`location.assign('#${pathRoute}');`)

  return win
}
