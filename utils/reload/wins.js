const fsExtra = require('fs-extra')
const logger = require('nlogs')(module)
const reloadWins = require('./utils/reloadWins')
const { DIR_DIST } = require('./constants')
const watchDirs = require('./utils/watchDirs')

logger.info('Start watch renderer dist')

fsExtra.ensureDirSync(DIR_DIST)

watchDirs(DIR_DIST, reloadWins).catch(logger.error)
