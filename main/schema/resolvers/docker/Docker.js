const logger = require('nlogs')(module)
const { firstKeysLowerCase } = require('../../../../utils/firstLowerCase')
const { docker } = require('../../../models')

const DockerQuery = {
  version: async () => {
    const { Version } = await docker.version()
    return Version
  },
  versions: async () => {
    const versions = firstKeysLowerCase(await docker.version())
    console.log(versions.components)
    return {
      ...versions,
      platform: versions.platform.name,
    }
  },
}

const Query = {
  docker: async () => ({
    loaded: await docker
      .ping()
      .then(ok => ok === 'OK')
      .catch(() => false),
  }),
}

module.exports = { DockerQuery, Query }
