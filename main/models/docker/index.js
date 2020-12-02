const { Docker } = require('node-docker-api')
const ProxyPromise = require('../../../utils/ProxyPromise')

const docker = new Docker()

ProxyPromise.wrap(docker, ['ping', 'info', 'version', 'events'])

console.log(docker)

docker.version().then(r => console.dir(r, { depth: 10 }))

module.exports = docker
