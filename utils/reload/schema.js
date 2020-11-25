const logger = require('nlogs')(module)
const { SCHEMA_PATH, SCHEMA_WATCH_DIRS } = require('./constants')
const watchDirs = require('./utils/watchDirs')
const schema = require(SCHEMA_PATH)
const clearAllCaches = require('./utils/clearAllCaches')
const reloadWins = require('./utils/reloadWins')

logger.info('Start watch schema', SCHEMA_PATH)

watchDirs(SCHEMA_WATCH_DIRS, async () => {
  logger.time('reload')
  logger.debug('Reload schema')

  clearAllCaches()

  const newSchema = require(SCHEMA_PATH)

  Object.entries(newSchema).forEach(([key, value]) => {
    schema[key] = value
  })

  reloadWins()

  logger.timeEnd('reload')
}).catch(logger.error)
