const Base = require('../Base')
const { Docker } = require('node-docker-api')
const ProxyPromise = require('../../../utils/ProxyPromise')
const { firstKeysLowerCase } = require('../../../utils/firstLowerCase')
const pubsub = require('../../pubsub')
const { DOCKER_EVENT, EVENTS } = require('./constants')

class DockerModel extends Base {
  constructor() {
    super()
    this.api = new Docker()
    ProxyPromise.wrap(this.api, ['ping', 'info', 'version', 'events'])

    this.watchEvents()
  }

  ping() {
    return this.api
      .ping()
      .then(ok => ok === 'OK')
      .catch(() => false)
  }

  async version() {
    const versions = firstKeysLowerCase(await this.api.version())
    return {
      ...versions,
      platform: versions.platform.name,
    }
  }

  async info() {
    return firstKeysLowerCase(await this.api.info(), true, [], ['ID'])
  }

  async watchEvents() {
    this.__req = await this.api.events()
    this.__req.on('data', async str => {
      const {
        timeNano,
        actor: { id, attributes },
        ...e
      } = firstKeysLowerCase(JSON.parse(`${str}`), true, [], ['ID'])

      const event = {
        ...e,
        time: parseInt(timeNano / 1000000),
        timeNano,
        actor: {
          id,
          atributes: {
            ...attributes,
            exitCode: attributes.exitCode ? Number(attributes.exitCode) : undefined,
          },
        },
      }
      await pubsub.publish(DOCKER_EVENT, event)
      if (EVENTS[event.type]) {
        await pubsub.publish(EVENTS[event.type], event)
      }
    })
  }

  end() {
    if (this.__req) this.__req.destroy()
    this.__req = null
  }
}

module.exports = new DockerModel()
