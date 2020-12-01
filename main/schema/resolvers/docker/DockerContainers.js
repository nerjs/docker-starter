const { dockerModel } = require('../../../models')

const DockerContainer = {
  image: ({ image: { name, tag } }) => dockerModel.images.getBy({ name, tag })[0],
}

const QueryDocker = {
  containers: () => dockerModel.containers.get(),
  container: (_, { id }) => dockerModel.containers.getById(id),
}

module.exports = { DockerContainer, QueryDocker }
