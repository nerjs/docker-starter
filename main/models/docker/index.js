const logger = require('nlogs')(module)
const { sleep } = require('helpers-promise')
const lodashGroupby = require('lodash.groupby')
const Info = require('./Info')
const Containers = require('./Containers')
const Images = require('./Images')
const BaseCLIModel = require('../base/BaseCLIModel')
const { match } = require('assert')
const { parseList } = require('../utils/parsers')
const Events = require('./Events')

class DockerModel extends BaseCLIModel {
  constructor() {
    super('docker')

    this.info = new Info(this)
    this.containers = new Containers(this)
    this.images = new Images(this)
    this.events = new Events(this)

    this.watchEvents()
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

  async watchEvents() {
    try {
      for await (let events of this.events.watch()) {
        const grouped = lodashGroupby(events, 'type')

        await Promise.all(
          Object.entries(grouped).map(async ([type, evs]) => {
            const utilObj = { image: this.images, container: this.containers }[type]

            if (utilObj) {
              await utilObj.event(evs)
              await this.info.event(evs)
            } else {
              logger.debug(type, evs)
            }
          }),
        )

        await sleep(500)
      }
    } catch (e) {
      logger.error(e)
      await sleep(100)
    }
    await sleep(100)
    await this.watchEvents()
  }
}

module.exports = new DockerModel()
