const path = require('path')

exports.DIR_DIST = path.resolve('../../renderer/dist')

exports.SCHEMA_PATH = require.resolve('../../main/schema')
exports.SCHEMA_WATCH_DIRS = [
  path.dirname(exports.SCHEMA_PATH),
  path.dirname(require.resolve('../../main/pubsub')),
  path.dirname(require.resolve('../../main/models')),
]
