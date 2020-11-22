const getAllCaches = (fileName, cache = new Set()) => {
  if (!require.cache[fileName] || cache.has(fileName) || /node_modules/.test(fileName)) return []
  cache.add(fileName)
  const mod = require.cache[fileName]
  ;(mod.children || []).forEach(ch => getAllCaches(ch.filename, cache))
  return [...cache]
}

module.exports = getAllCaches
