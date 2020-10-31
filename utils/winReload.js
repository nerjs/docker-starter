const path = require('path')
const fsExtra = require('fs-extra')
const { BrowserWindow } = require('electron')
const debounce = require('debounce')
const logger = require('nlogs')(module)

const dir = path.join(__dirname, '..', 'renderer', 'dist')

fsExtra.ensureDirSync(dir)

const update = debounce(() => {
  const wins = BrowserWindow.getAllWindows().filter(win => !win.isDestroyed())
  if (!wins.length) return
  logger.debug(`Reload ${wins.length} windows`)
  wins.forEach(win => win.reload())
}, 100)

fsExtra.watch(
  dir,
  {
    persistent: false,
  },
  update,
)
