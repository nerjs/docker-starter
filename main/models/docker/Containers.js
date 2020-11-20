const BaseCLIUtil = require('../base/BaseCLIUtil')
const Container = require('./utils/Container')
const CollectionCLIUtil = require('../base/CollectionCLIUtil')

class Containers extends CollectionCLIUtil {
  constructor(parent) {
    super(parent, ['ps', '-a', '--no-trunc', '--format="{{json .}}"'], Container)
  }
}

module.exports = Containers
