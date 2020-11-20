const { dockerModel } = require('../../../models')

const Query = {
  docker: async () => {
    return {
      loaded: await dockerModel.check(),
    }
  },
}

module.exports = { Query }
