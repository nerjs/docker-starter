const moment = require('moment')
const bytes = require('bytes')
const BaseCLIUtil = require('../../base/BaseCLIUtil')
const BaseImage = require('./BaseImage')
const Status = require('./Status')
const Label = require('./Label')
const Ports = require('./Ports')
const Mount = require('./Mount')
const { parseTime } = require('../../utils/parsers')

class Container extends BaseCLIUtil {
  constructor(container, parent) {
    super(parent)

    const { id, command, createdAt, image, labels, localVolumes, mounts, names, networks, ports, size, status } = container

    this.id = id
    this.name = names
    this.command = command
    this.status = new Status(status)
    this.size = bytes(size)
    this.created = parseTime(createdAt)
    this.localVolumes = localVolumes
    this.image = new BaseImage(image)
    this.labels = Label.parse(labels)
    this.mounts = Mount.parse(mounts)
    this.networks = networks
    this.ports = Ports.parse(ports)
  }
}

module.exports = Container
