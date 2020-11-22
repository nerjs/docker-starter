const { sleep } = require('helpers-promise')
const logger = require('nlogs')(module)
const debounce = require('debounce')
const fsExtra = require('fs-extra')
const getAllDirs = require('./getAllDirs')

const watchDirs = async (inputDirs = [], cb) => {
  let watchers = []
  const dirs = await getAllDirs(inputDirs)
  const handler = debounce(async () => {
    watchers.forEach(w => w.close())
    try {
      await cb()
    } catch (e) {
      logger.error(e)
      await sleep(1000)
    }

    watchDirs(inputDirs, cb).catch(logger.error)
  }, 10)

  watchers = dirs.map(dir =>
    fsExtra.watch(
      dir,
      {
        persistent: true,
      },
      handler,
    ),
  )
}

module.exports = watchDirs
