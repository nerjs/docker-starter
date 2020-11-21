const { exec, spawn } = require('child_process')
const merge = require('merge')
const AsyncIterator = require('./AsyncIterator')
const DataComposer = require('./DataComposer')

class ExecuteError extends Error {
  constructor(code) {
    super('Process exited with non-zero code')
    this.code = code
  }

  get name() {
    return 'ExecuteError'
  }
}

const defaultOptions = {
  cwd: process.cwd(),
  timeout: 1000 * 30,
  shell: true,
}

class Execute {
  constructor(command, args, options) {
    this.command = command
    this.args = this.prepareArgs(args && (Array.isArray(args) || typeof args === 'string') ? args : [])
    this.options = merge.recursive(
      {},
      defaultOptions,
      options || (args && typeof args === 'object' && !Array.isArray(args) ? args : {}),
    )
  }

  prepareArgs(args) {
    if (!args) return []
    if (typeof args === 'string') return [args]
    if (Array.isArray(args)) return args.map(s => `${s}`)
    throw new Error('Incorrect type command args')
  }

  exec(currentArgs = [], currentOptions, structuredResolve) {
    const command = [this.command, ...this.args, ...this.prepareArgs(currentArgs)].join(' ')
    const options = merge.recursive({}, this.options, currentOptions || {})

    return new Promise((resolve, reject) => {
      const dc = Execute.readSaveCP(
        exec(command, options, err => {
          if (err) return reject(err)
          resolve(
            structuredResolve
              ? dc.getAll()
              : dc
                  .getAll()
                  .map(({ stderr, stdout }) => stdout || stderr)
                  .join(''),
          )
        }),
      )
    })
  }

  watch(currentArgs = [], currentOptions, structuredResolve) {
    const command = [this.command, ...this.args, ...this.prepareArgs(currentArgs)].join(' ')
    const { type, ...options } = merge.recursive({}, this.options, currentOptions || {}, {
      type: AsyncIterator.RETURN_TYPES.ONCE,
    })

    const asyncIterator = new AsyncIterator({ type })

    const handlerWrap = handler => value => `${value}`.trim() && handler(`${value}`.trim())

    const childProcess = spawn(command, options)
    const close = Execute.readCP(
      childProcess,
      handlerWrap(stdout => asyncIterator.next(structuredResolve ? { stdout } : stdout)),
      handlerWrap(stderr => asyncIterator.next(structuredResolve ? { stderr } : stderr)),
      () => {
        if (!asyncIterator.stoped) asyncIterator.return()
        close.closed = true
      },
      err => asyncIterator.throw(err),
    )

    asyncIterator.emitter.once('stop', () => {
      if (!close.closed) {
        close()
        childProcess.kill()
      }
    })

    return asyncIterator
  }

  static readCP(childProcess, handleStdout, handleStderr, handleClose, handleError) {
    const _handleClose = code => {
      if (code && handleError) handleError(new ExecuteError(code))
      childProcess.removeListener('close', _handleClose)
      childProcess.stdout.removeListener('data', handleStdout)
      childProcess.stderr.removeListener('data', handleStderr)
      if (handleError) childProcess.removeListener('error', handleError)
      if (handleClose && typeof handleClose === 'function') handleClose()
    }

    childProcess.stdout.on('data', handleStdout)
    childProcess.stderr.on('data', handleStderr)
    if (handleError) childProcess.on('error', handleError)
    childProcess.once('close', _handleClose)

    return _handleClose
  }

  static readSaveCP(childProcess) {
    const dc = new DataComposer()

    const end = this.readCP(
      childProcess,
      stdout => dc.set({ stdout }),
      stderr => dc.set({ stderr }),
    )

    dc.end = end
    return dc
  }
}

module.exports = Execute
