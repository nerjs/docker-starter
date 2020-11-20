const { dockerModel } = require('../../../models')

const DockerInfoImages = {
  uses: async () => {
    const [containers, images] = await Promise.all([
      dockerModel.containers.get().then(cons =>
        cons.reduce((cn, c) => {
          cn.add(`${c.image.name}:${c.image.tag}`)
          return cn
        }, new Set()),
      ),
      dockerModel.images.get().then(imgs =>
        imgs.reduce((s, c) => {
          s.add(`${c.name}:${c.tag}`)
          return s
        }, new Set()),
      ),
    ])

    return [...images].filter(im => containers.has(im)).length
  },
}

const DockerInfo = {
  containers: () => dockerModel.info.containers(),
  images: () => dockerModel.info.images(),
}

const Docker = {
  info: () => dockerModel.info.root(),
}

module.exports = { DockerInfoImages, DockerInfo, Docker }
