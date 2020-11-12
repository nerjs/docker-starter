const { globalShortcut } = require('electron')
const { playgroundWindow } = require('../../renderer')

let win

globalShortcut.register('F11', async () => {
  if (!win) {
    win = await playgroundWindow()
  }

  win.focus()
})
