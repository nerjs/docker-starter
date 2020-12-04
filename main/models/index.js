const Base = require('./Base')

exports.docker = require('./docker')

exports.end = async () => {
  await Promise.all(
    Object.values(exports).map(async mod => {
      if (!(mod instanceof Base)) return
      await mod.end()
    }),
  )
}
