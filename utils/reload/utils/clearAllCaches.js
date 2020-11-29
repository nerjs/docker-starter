const getAllCaches = require('./getAllCaches')

module.exports = async fileName => {
  console.log(await getAllCaches(fileName))
  ;(await getAllCaches(fileName)).forEach(file => {
    console.log(1, file)
    delete require.cache[file]
  })
}
