const CollectionCLIUtil = require('../base/CollectionCLIUtil')
const Image = require('./utils/Image')

class Images extends CollectionCLIUtil {
  constructor(parent) {
    super(parent, ['images', '-a', '--format="{{json .}}"'], Image)
  }

  async event(events) {
    await this.update()
  }
}

module.exports = Images
