const Events = require('events')
const { sleep } = require('helpers-promise')
const asyncEmitters = require('./asyncEmitters')
const DataComposer = require('./DataComposer')

const STOPPED = Symbol('Stopped iterate')

class AsyncIterator {
  constructor(options) {
    this.options = {
      type: AsyncIterator.RETURN_TYPES.ONCE,
      maxSaveItems: AsyncIterator.MAX_SAVE_ITEMS,
      ...(options || {}),
    }

    this.emitter = new Events()
    this.dc = new DataComposer(this.options.maxSaveItems)
    this[STOPPED] = false

    const dataHanler = data => this.dc.set(data)

    if (this.options.type !== AsyncIterator.RETURN_TYPES.NEXT) this.emitter.on('data', dataHanler)
    this.emitter.on('error', function noop() {})
    this.emitter.once('stop', () => {
      if (this.options.type !== AsyncIterator.RETURN_TYPES.NEXT) this.emitter.removeListener('data', dataHanler)
      this[STOPPED] = true
    })
  }

  get stoped() {
    return this[STOPPED]
  }

  return(data) {
    this.emitter.emit('stop')
    this.emitter.emit('data', data)
    return this
  }

  throw(err) {
    this.emitter.emit('stop')
    this.emitter.emit('error', err)
    return this
  }

  next(data) {
    this.emitter.emit('data', data)
    return this
  }

  complete(data) {
    return this.return(data)
  }

  error(err) {
    return this.throw(err)
  }

  async createIteratorPromise() {
    if (this.options.type === AsyncIterator.RETURN_TYPES.NEXT) return asyncEmitters(this.emitter, 'data', 'error')

    if (!this.dc.has()) {
      await asyncEmitters(this.emitter, 'data', 'error')
    }

    switch (this.options.type) {
      case AsyncIterator.RETURN_TYPES.ONCE:
        return this.dc.get()
      case AsyncIterator.RETURN_TYPES.FIRST:
        return this.dc.first()
      case AsyncIterator.RETURN_TYPES.LAST:
        return this.dc.last()
      default:
        return this.dc.getAll()
    }
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this[STOPPED]) return { done: true }

        return { done: false, value: this.createIteratorPromise() }
      },
    }
  }

  static RETURN_TYPES = {
    ALL: 'all',
    FIRST: 'first',
    LAST: 'last',
    NEXT: 'next',
    ONCE: 'once',
  }

  static MAX_SAVE_ITEMS = 10000
}

module.exports = AsyncIterator
