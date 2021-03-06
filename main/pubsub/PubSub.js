const { PubSub, withFilter } = require('graphql-subscriptions')

const ALL = '::all::'
const noop = () => true

class FilteredPubSub extends PubSub {
  filter(triggers, filter) {
    if (typeof triggers === 'function') return this.filter(ALL, triggers)
    if (!filter) return this.filter(triggers, noop)
    return withFilter(() => this.asyncIterator(triggers), filter)
  }

  createPubSubFilter(trigger) {
    const pubsubFilter = filter => this.filter(trigger, filter)
    pubsubFilter.publish = this.publish.bind(this)
    pubsubFilter.subscribe = this.subscribe.bind(this)
    pubsubFilter.trigger = trigger

    return pubsubFilter
  }

  static ALL = ALL
}

module.exports = FilteredPubSub
