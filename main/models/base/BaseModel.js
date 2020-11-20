const { withFilter } = require('graphql-subscriptions')
const pubsub = require('../../pubsub')

class BaseModel {
  constructor(eventPrefix) {
    this.eventPrefix = eventPrefix
  }

  createPubSub(eventName) {
    const channel = `${this.eventPrefix || '_'}:${eventName}`
    const filter = (...filters) => withFilter(() => pubsub.asyncIterator(channel), ...filters)

    filter.pub = filter.publish = payload => pubsub.publish(channel, payload)
    filter.sub = filter.subscribe = onMessage => pubsub.subscribe(channel, onMessage)

    return filter
  }
}

module.exports = BaseModel
