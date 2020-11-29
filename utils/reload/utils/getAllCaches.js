const path = require('path')
const getAllFiles = require('./getAllFiles')

const getAllCaches = (fileName, cache = new Set()) => {
  if (!require.cache[fileName] || cache.has(fileName) || /node_modules/.test(fileName) || !/^\//.test(fileName)) return
  cache.add(fileName)
  const mod = require.cache[fileName]
  ;(mod.children || []).forEach(ch => getAllCaches(ch.filename, cache))
}

module.exports = async fileName => {
  const cache = new Set()
  const allFiles = await getAllFiles(path.dirname(fileName))

  ;[fileName, ...allFiles].forEach(f => getAllCaches(f, cache))

  return [...cache]
}
