const logger = require('nlogs')(module)
const { sleep } = require('helpers-promise')
const AsyncIterator = require('../../../utils/AsyncIterator')
const CollectionCLIUtil = require('../base/CollectionCLIUtil')
const Event = require('./utils/Event')
const { parseList } = require('../utils/parsers')
const { EVENTS_MAX_FOR_TIME, EVENTS_MAX_RETRY } = require('./constants')
const pubsub = require('../../pubsub')

class Events extends CollectionCLIUtil {
  constructor(parent) {
    super(
      parent,
      () => [
        'events',
        '--since',
        parseInt((Date.now() - EVENTS_MAX_FOR_TIME) / 1000),
        '--until',
        parseInt(Date.now() / 1000),
        '--format="{{json .}}"',
      ],
      Event,
      {
        onStderr: logger.error,
      },
    )

    this.asyncIterator = new AsyncIterator({
      maxSaveItems: 100,
      type: AsyncIterator.RETURN_TYPES.ALL,
    })

    this.filter = pubsub.createPubSubFilter('docker:events')

    this.startWatch()
  }

  async update(...mdw) {
    await super.update(...mdw)
    this.cachedData.sort((ev1, ev2) => ev2.timeNano - ev1.timeNano)
  }

  async startWatch(tryCount = 0) {
    if (tryCount >= EVENTS_MAX_RETRY)
      return logger.warn(`Достигнуто максимальное количество попыток прослушивания (${tryCount})`)
    if (tryCount) logger.debug(`Try №${tryCount}`)
    try {
      for await (let { stdout, stderr } of this.ex.watch(['events', '--format="{{json .}}"'], {}, true)) {
        if (stderr) {
          logger.warn(stderr)
          continue
        }

        const arr = parseList(stdout)
          .map(sto => new Event(sto))
          .filter(ev => {
            if (ev.correct) return true
            logger.warn('Incorrect event', ev)
            return false
          })

        if (!arr.length) continue
        ;(await this.get()).unshift(...arr)

        arr.forEach(ev => {
          this.filter.publish(ev)
          this.asyncIterator.next(ev)
        })
      }
    } catch (e) {
      logger.error(e)
      await sleep(100)
    }

    await sleep(tryCount * 50)
    this.startWatch(++tryCount)
  }

  watch() {
    return this.asyncIterator
  }
}

module.exports = Events
