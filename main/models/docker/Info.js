const BaseCLIUtil = require('../base/BaseCLIUtil')
const { parseItem } = require('../utils/parsers')
const pubsub = require('../../pubsub')

class Info extends BaseCLIUtil {
  constructor(parent) {
    super(parent.ex, ['info', '--format="{{json .}}"'], {
      default: {},
      parse: parseItem,
    })

    this.filter = pubsub.createPubSubFilter('docker:filter')
  }

  async root() {
    const { indexServerAddress: serverAddress, dockerRootDir: rootDir, serverVersion: version } = await this.get()

    return { serverAddress, rootDir, version }
  }

  async containers() {
    const {
      containers: count,
      containersRunning: running,
      containersPaused: paused,
      containersStopped: stopped,
    } = await this.get()

    return { count, running, paused, stopped }
  }

  async images() {
    const { images: count } = await this.get()

    return {
      count,
    }
  }

  async event(events) {
    await this.update()
    this.filter.publish(await this.get())
  }
}

module.exports = Info
