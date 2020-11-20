const { ipcMain } = require('electron')
const { execute, subscribe } = require('graphql')
const { GQL_CHANNEL_QUERY, GQL_CHANNEL_SUBSCRIBE } = require('../../constants/api')
const Counter = require('../../utils/Counter')
const Context = require('./Context')
const schema = require('../shema')
const { serializeError } = require('serialize-error')

const counter = new Counter()

ipcMain.handle(GQL_CHANNEL_QUERY, async (channel, query) => {
  const ctx = new Context(schema, channel, query)
  try {
    const { errors, data } = await execute(ctx.options)
    return { data, errors: errors ? errors.map(serializeError) : null }
  } catch (e) {
    return { errors: [serializeError(e)] }
  }
})

ipcMain.handle(GQL_CHANNEL_SUBSCRIBE, async (channel, query) => {
  const ctx = new Context(schema, channel, query)
  const subscribeEventName = `${GQL_CHANNEL_SUBSCRIBE}:${counter.num}`

  ;(async () => {
    let handler, stoped
    const observer = await subscribe(ctx.options)

    const unsubscribe = () => {
      if (stoped) return
      stoped = true
      ipcMain.removeListener(subscribeEventName, handler)
      observer.return()
    }

    handler = (_, args) => {
      if (args?.type === 'unsubscribe') unsubscribe()
    }

    ipcMain.on(subscribeEventName, handler)

    try {
      for await (result of observer) {
        ctx.reply(subscribeEventName, {
          type: 'next',
          result,
        })
      }
    } catch (error) {
      ctx.reply(subscribeEventName, {
        type: 'error',
        error: serializeError(error),
      })
      unsubscribe()
    }

    ctx.reply(subscribeEventName, { type: 'complete' })
    unsubscribe()
  })()

  return { subscribeEventName }
})
