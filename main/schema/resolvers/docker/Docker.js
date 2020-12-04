const logger = require('nlogs')(module)
const { firstKeysLowerCase } = require('../../../../utils/firstLowerCase')
const { docker } = require('../../../models')

const DockerQuery = {
  version: async () => {
    return (await docker.version()).version
  },
  versions: async () => docker.version(),
  info: async () => docker.info(),
}

const Query = {
  docker: async () => ({
    loaded: await docker.ping(),
  }),
}

module.exports = { DockerQuery, Query }
