const bytes = require('bytes')
const BaseCLIUtil = require('../../base/BaseCLIUtil')
const { parseTime } = require('../../utils/parsers')

class Image extends BaseCLIUtil {
  constructor(image, parent) {
    super(parent)

    const { digest, id, repository, createdAt, sharedSize, size, tag, uniqueSize, virtualSize } = image

    // console.log({ id, image })
    this.id = id
    this.name = repository
    this.tag = tag
    this.createdAt = parseTime(createdAt)
    this.size = bytes(size)
    this.virtualSize = bytes(virtualSize)
    this.digest = digest
    this.sharedSize = bytes(sharedSize)
    this.uniqueSize = bytes(uniqueSize)
  }
}

module.exports = Image
