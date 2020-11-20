const BaseModel = require('../base/BaseModel')
const { app } = require('electron')
const Execute = require('../../../utils/Execute')
const Info = require('./Info')
const Containers = require('./Containers')
const Images = require('./Images')

class DockerModel extends BaseModel {
  constructor() {
    super('docker')

    this.ex = new Execute('docker', {
      cwd: app.getPath('home'),
    })

    this.info = new Info(this)
    this.containers = new Containers(this)
    this.images = new Images(this)
  }

  async check() {
    if (this.hasOwnProperty('__check')) return !!this.__check

    try {
      const str = await this.ex.exec('-v')
      this.__check = /^(D|d)ocker\sversion\s[0-9]/.test(`${str}`)
      return this.__check
    } catch (e) {
      this.__check = false
      return false
    }
  }
}

module.exports = new DockerModel()
