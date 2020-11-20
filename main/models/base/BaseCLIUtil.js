const logger = require('nlogs')(module)
const Execute = require('../../../utils/Execute')

const CACHED_DATA = Symbol('Cached data')
const PARENT = Symbol('Parent')
const EXECUTE = Symbol('Execute')
const OPTIONS = Symbol('Options')
const CLI_ARGS = Symbol('CLI args')
const LOADED = Symbol('Loaded')

/**
 * @class Базовый сласс для работы с CLI
 * @name BaseCLIUtil
 */
class BaseCLIUtil {
  /**
   * @param {Execute|Object} parent
   * @param {[String]} cliArgs
   * @param {Object} [options]
   * @param {Number} [options.timeout=10000]
   * @param {*} [options.default=null]
   * @param {Function} [options.parse]
   * @param {Function} [options.onStderr]
   */
  constructor(parent, cliArgs, options) {
    this[OPTIONS] = {
      ...{
        timeout: 10000,
        first: false,
        default: null,
        executeName: BaseCLIUtil.EXECUTE_NAME,
        parse: s => s,
        onStderr: s => {
          logger.warn(s)
          return null
        },
      },
      ...(options || {}),
    }

    const [_parent, ex] = BaseCLIUtil.parseParent(parent, this[OPTIONS].executeName)
    this[PARENT] = _parent
    this[CLI_ARGS] = cliArgs || []
    this[EXECUTE] = ex || new Execute('', [], {})

    this[CACHED_DATA] = null
  }

  get parent() {
    return this[PARENT]
  }

  get ex() {
    return this[EXECUTE]
  }

  get cliArgs() {
    return this[CLI_ARGS]
  }

  get options() {
    return this[OPTIONS]
  }

  async update(...middlewares) {
    this[CACHED_DATA] = this.ex
      .exec(this.cliArgs, { timeout: this.options.timeout }, true)
      .then(arr => {
        const str = arr
          .map(({ stdout, stderr }) => {
            if (stdout) return stdout
            if (stderr && this.options.onStderr) return this.options.onStderr(stderr)
            return null
          })
          .filter(s => !!s)
          .join('')

        return str
      })
      .then(this.options.parse)

    let result = await this[CACHED_DATA]

    if (middlewares.length) {
      for (let mdw of middlewares) {
        if (typeof mdw !== 'function') continue
        result = await mdw(result)
      }
    }

    this[CACHED_DATA] = result
  }

  /**
   * @returns {Promise<*>}
   */
  async get() {
    if (this[CACHED_DATA]) return this[CACHED_DATA]
    await this.update()
    return this[CACHED_DATA] === undefined ? this.options.default : this[CACHED_DATA]
  }

  static parseParent(parent, executeName) {
    if (!parent) return [null, null]
    if (parent instanceof Execute) return [null, parent]
    if (parent[executeName] && parent[executeName] instanceof Execute) return [parent, parent[executeName]]
    return [null, null]
  }

  static EXECUTE_NAME = 'ex'
}

module.exports = BaseCLIUtil
