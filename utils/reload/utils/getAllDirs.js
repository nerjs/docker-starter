const fsExtra = require('fs-extra')
const path = require('path')

const getAllDirs = async dirName => {
  if (Array.isArray(dirName)) return (await Promise.all(dirName.map(dir => getAllDirs(dir)))).flat()

  try {
    const stat = await fsExtra.stat(dirName)
    if (!stat.isDirectory()) return []
  } catch {
    return []
  }

  const files = await fsExtra.readdir(dirName)

  return [dirName, ...(await Promise.all(files.map(file => getAllDirs(path.join(dirName, file)))))].flat()
}

module.exports = getAllDirs
