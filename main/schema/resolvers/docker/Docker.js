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
    return {
      ...versions,
      platform: versions.platform.name,
    }
  },
  info: async () => {
    const info = firstKeysLowerCase(await docker.info(), true, [], ['ID'])
    console.log(111, info)
    return {
      ...info,
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
