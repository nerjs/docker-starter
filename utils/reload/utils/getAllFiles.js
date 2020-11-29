const fsExtra = require('fs-extra')
const path = require('path')

const getAllFiles = async fileName => {
  if (Array.isArray(fileName)) return (await Promise.all(fileName.map(file => getAllFiles(file)))).flat()

  try {
    const stat = await fsExtra.stat(fileName)
    if (!stat.isDirectory()) return [fileName]
  } catch {
    return []
  }

  const files = await fsExtra.readdir(fileName)

  return [fileName, ...(await Promise.all(files.map(file => getAllFiles(path.join(fileName, file)))))].flat()
}

module.exports = getAllFiles
