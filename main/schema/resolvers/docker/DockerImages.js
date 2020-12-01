const { dockerModel } = require('../../../models')

const DockerImage = {
  containers: ({ name, tag }) => dockerModel.containers.filterBy({ 'image.name': name, 'image.tag': tag }),
}

const QueryDocker = {
  images: () => dockerModel.images.get(),
  image: (_, { id }) => dockerModel.images.getById(id),
}

module.exports = { DockerImage, QueryDocker }
