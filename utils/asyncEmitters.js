class TimeOutError extends Error {
  constructor() {
    super('Timeout Error')
  }

  get name() {
    return 'TimeOutError'
  }
}

module.exports = (emitter, resolveTrigger, rejectTrigger, timeout) =>
  new Promise((resolve, reject) => {
    let resolveHandler, rejectHandler, tid

    const clear = () => {
      if (tid) clearTimeout(tid)
      if (resolveHandler) emitter.removeListener(resolveTrigger, resolveHandler)
      if (rejectHandler) emitter.removeListener(rejectTrigger, rejectHandler)
    }

    if (resolveTrigger) {
      resolveHandler = data => {
        resolveHandler = null
        clear()
        resolve(data)
      }
      emitter.once(resolveTrigger, resolveHandler)
    }

    if (rejectTrigger) {
      rejectHandler = error => {
        rejectHandler = null
        clear()
        reject(error)
      }

      rejectHandler.name = 'testFn'
      emitter.once(rejectTrigger, rejectHandler)
    }

    if (timeout) {
      tid = setTimeout(() => {
        tid = null
        clear()
        reject(new TimeOutError())
      }, timeout)
    }
  })
