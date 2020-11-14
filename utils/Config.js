const merge = require('merge')
const jsYaml = require('js-yaml')
const fs = require('fs')
const util = require('util')
const path = require('path')
const commandLineArgs = require('command-line-args')

const CONFIG_FILES = Symbol('Config files')
const ARGS_SCHEMA = Symbol('Args schema')

class Config {
  constructor(configFiles, argsSchema) {
    this.validateFiles(configFiles)

    this[ARGS_SCHEMA] = argsSchema

    this.loadFiles()
    this.mergeConfig()
  }

  get configFiles() {
    return this[CONFIG_FILES] || []
  }

  set configFiles(value) {
    this[CONFIG_FILES] = value
  }

  validateFiles(files) {
    if (typeof files === 'string') return this.validateFiles([files])
    if (!Array.isArray(files)) throw new Error('Incorrect config files. Must be Array | String')

    this.configFiles = []

    files.forEach(file => {
      try {
        const stat = fs.statSync(file)
        this.configFiles.push({ file, valid: stat.isFile() })
      } catch (error) {
        this.configFiles.push({ file, valid: false, error: error.code === 'ENOENT' ? null : error })
      }
    })
  }

  loadFiles() {
    if (!this.configFiles.length) return

    this.configFiles
      .filter(conf => conf.valid)
      .forEach(conf => {
        const data = fs.readFileSync(conf.file)

        conf.source = Config.parseEnv(data, Config.getEnv(conf.file))
      })
  }

  mergeConfig() {
    this.configFiles
      .filter(conf => conf.valid)
      .forEach(conf => {
        conf.config = jsYaml.safeLoad(conf.source)
      })

    Object.entries(merge.recursive({}, ...this.configFiles.map(conf => conf.config), this.parseArgs())).forEach(
      ([key, value]) => {
        this[key] = value
      },
    )
  }

  parseArgs() {
    if (typeof this[ARGS_SCHEMA] !== 'object' && !Array.isArray(this[ARGS_SCHEMA]))
      throw new Error('Incorrect schema argiments')
    if (!this[ARGS_SCHEMA]) return {}

    const args = {}

    if (Array.isArray(this[ARGS_SCHEMA])) {
      args.args = commandLineArgs(this[ARGS_SCHEMA])
    } else {
      Object.entries(this[ARGS_SCHEMA]).forEach(([key, schema]) => {
        args[key] = commandLineArgs(schema)
      })
    }

    return args
  }

  [util.inspect.custom]() {
    return merge({}, this)
  }

  static parseEnv(source, envObject) {
    let str = `${source}`

    if (typeof envObject === 'object') {
      Object.entries(envObject).forEach(([key, value]) => {
        str = str.replace(`\$\{${key}\}`, `${value}`)
      })
    }

    return str
  }

  static getEnv(fileName) {
    return {
      ...process.env,
      __filename: fileName,
      __dirname: path.dirname(fileName),
      __cwd: process.cwd(),
      cwd: process.cwd(),
    }
  }
}

module.exports = Config
