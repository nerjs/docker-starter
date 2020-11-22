const { PubSub, withFilter } = require('graphql-subscriptions')

const pubsub = new PubSub()
const c = new Map()
let i = 0
setInterval(() => pubsub.publish('TT', { id: i++, name: 'name' }), 1000)
const Query = {
  test: async (_, { id }, ctx) => {
    // console.log({ _, id, ctx })
    // return c.has(id) ? { id, name: c.get(id) } : null
    return { id: 112 }
  },
}

const Mutation = {
  setTest: (_, { id, name }) => {
    c.set(id, name)
    return { id, name }
  },
}

const Subscription = {
  tt: {
    subscribe: withFilter(
      () => pubsub.asyncIterator('TT'),
      (...args) => {
        console.log('filter')
        // console.log({ args })
        return true
      },
    ),
    resolve: async (...args) => {
      // console.log('resolve', { args })
      console.log('resolve')
      return args[0]
    },
  },
}

module.exports = { Query, Mutation, Subscription }
