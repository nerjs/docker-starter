const sf = require('systeminformation')

const DockerImages = {
  used: () => 111,
}

const DockerContainers = {}

const System = {
  time: () => sf.time(),
  // docker: async () => {
  //   const {
  //     dockerRootDir,
  //     serverVersion,
  //     containers,
  //     containersRunning,
  //     containersPaused,
  //     containersStopped,
  //     images,
  //   } = await sf.dockerInfo()

  //   return {
  //     version: serverVersion,
  //     rootDir: dockerRootDir,
  //     images: {
  //       count: images,
  //     },
  //     containers: {
  //       count: containers,
  //       running: containersRunning,
  //       paused: containersPaused,
  //       stopped: containersStopped,
  //     },
  //   }
  // },
}

module.exports = {
  // DockerImages,
  // DockerContainers,
  System,
  Query: {
    system: () => ({}),
  },
}
