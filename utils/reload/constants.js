const path = require('path')
const config = require('../../config')

exports.DIR_DIST = config.paths.renderer.dist

exports.SCHEMA_PATH = config.paths.main.schema
exports.SCHEMA_WATCH_DIRS = [
  path.dirname(exports.SCHEMA_PATH),
  path.dirname(require.resolve(`${config.paths.main.main}/pubsub`)),
  path.dirname(require.resolve(`${config.paths.main.main}/models`)),
]

console.log(exports)
