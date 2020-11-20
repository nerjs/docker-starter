const CollectionCLIUtil = require('../base/CollectionCLIUtil')
const Image = require('./utils/Image')

class Images extends CollectionCLIUtil {
  constructor(parent) {
    super(parent, ['images', '-a', '--format="{{json .}}"'], Image)
  }
}

module.exports = Images
