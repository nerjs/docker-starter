const Events = require('events')
const { nativeImage, Tray, Menu } = require('electron')
const logger = require('nlogs')(module)
const path = require('path')
const { app } = require('electron')

const IMG_NAME = Symbol('Img')

class AppTray extends Events {
  constructor() {
    super()

    this[IMG_NAME] = null

    this.SET_IMG_EVENT = 'set:img'
    this.NEW_PROJECT_EVENT = 'new:project'
    this.SHOW_PROJECTS_EVENT = 'show:projects'
    this.DOCKER_INFO_EVENT = 'docker:info'
    this.CHANGE_STATUS_EVENT = 'change:status'
    this.CLICK_EVENT = 'click'

    this.STATUS_DEFAULT = 'default'
    this.STATUS_INFO = 'info'
    this.STATUS_WARN = 'warn'

    this.icons = {
      [this.STATUS_DEFAULT]: nativeImage.createFromPath(path.join(app.getAppPath(), 'icons', 'tray', 'default.png')),
      [this.STATUS_INFO]: nativeImage.createFromPath(path.join(app.getAppPath(), 'icons', 'tray', 'info.png')),
      [this.STATUS_WARN]: nativeImage.createFromPath(path.join(app.getAppPath(), 'icons', 'tray', 'warn.png')),
    }

    this.currentStatus = this.STATUS_DEFAULT

    this.tray = null

    this.show()
  }

  get icon() {
    if (!this[IMG_NAME] || !this.icons[this[IMG_NAME]]) this.icon = this.STATUS_DEFAULT
    return this.icons[this[IMG_NAME]]
  }

  set icon(imgName) {
    if (this[IMG_NAME] === imgName) return
    if (!this.icons[imgName]) return logger.error(`Img ${imgName} not supported`)
    this[IMG_NAME] = imgName

    if (!this.tray) return
    this.tray.setImage(this.icon)
    this.emit(this.SET_IMG_EVENT, imgName)
  }

  show() {
    if (this.tray) return logger.warn('Tray is already used')
    this.tray = new Tray(this.icon)

    this.createMenu()
    this.tray.setContextMenu(this.menu)
    this.tray.on('click', () => this.emit(this.CLICK_EVENT))
  }

  hide() {
    if (!this.tray) return logger.warn('Tray is not defined')
    this.tray.destroy()
    this.tray.removeAllListeners(this.CLICK_EVENT)
    this.tray = null
  }

  createMenu() {
    if (this.menu) return
    this.menu = Menu.buildFromTemplate([
      {
        label: 'New Project',
        click: () => this.emit(this.NEW_PROJECT_EVENT),
      },
      {
        label: 'Show projects',
        click: () => this.emit(this.SHOW_PROJECTS_EVENT),
      },
      {
        label: 'Docker info',
        click: () => this.emit(this.DOCKER_INFO_EVENT),
      },
      {
        type: 'separator',
      },
      {
        label: 'Выход',
        role: 'quit',
      },
    ])
  }

  status(statusName) {
    if (this.currentStatus === statusName) return logger.debug(`Status ${statusName} not changed`)
    this.icon = statusName
    this.currentStatus = statusName
    this.emit(this.CHANGE_STATUS_EVENT)
  }
}

module.exports = AppTray
