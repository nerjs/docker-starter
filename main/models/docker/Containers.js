const BaseCLIUtil = require('../base/BaseCLIUtil')
const Container = require('./utils/Container')
const CollectionCLIUtil = require('../base/CollectionCLIUtil')
const pubsub = require('../../pubsub')

class Containers extends CollectionCLIUtil {
  constructor(parent) {
    super(parent, ['ps', '-a', '--no-trunc', '--format="{{json .}}"'], Container)

    this.filterCreate = pubsub.createPubSubFilter('docker:containers:create')
  }

  async event(events) {
    console.log(events)
    await this.update()
  }
}

module.exports = Containers
