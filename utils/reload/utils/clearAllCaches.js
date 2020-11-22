const getAllCaches = require('./getAllCaches')

module.exports = fileName => {
  getAllCaches(fileName).forEach(file => {
    delete require.cache[file]
  })
}
