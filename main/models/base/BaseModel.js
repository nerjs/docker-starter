const logger = require('nlogs')(module)
const pubsub = require('../../pubsub')

class BaseModel {
  constructor(eventPrefix) {
    this.eventPrefix = eventPrefix
  }

  createPubSub(eventName) {
    const channel = this.eventPrefix ? `${this.eventPrefix || '_'}:${eventName}` : eventName
    return pubsub.createPubSubFilter(channel)
  }
}

module.exports = BaseModel
