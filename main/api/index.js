const { ipcMain } = require('electron')
const { execute, subscribe } = require('graphql')
const logger = require('nlogs')(module)
const { GQL_CHANNEL_QUERY, GQL_CHANNEL_SUBSCRIBE } = require('../../constants/api')
const Counter = require('../../utils/Counter')
const Context = require('./Context')
const schema = require('../schema')
const { serializeError } = require('serialize-error')

const counter = new Counter()

const prepareErrors = err =>
  err instanceof Error
    ? [serializeError(err)]
    : Array.isArray(err)
    ? err.map(e => serializeError(e))
    : [
        (() => {
          logger.error('Incorrect error', e)
          return [serializeError(new Error('Incorrect error'))]
        })(),
      ]

ipcMain.handle(GQL_CHANNEL_QUERY, async (channel, query) => {
  const ctx = new Context(schema, channel, query)
  try {
    ctx.validate()
    const { errors, data } = await execute(ctx.options)
    if (errors) throw errors

    return { data }
  } catch (e) {
    return { data: null, errors: prepareErrors(e) }
  }
})

ipcMain.handle(GQL_CHANNEL_SUBSCRIBE, async (channel, query) => {
  const ctx = new Context(schema, channel, query)
  const subscribeEventName = `${GQL_CHANNEL_SUBSCRIBE}:${counter.num}`

  try {
    ctx.validate()
  } catch (e) {
    return { errors: prepareErrors(e) }
  }

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
