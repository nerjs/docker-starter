const { app } = require('electron')
const BaseModel = require('./BaseModel')
const Execute = require('../../../utils/Execute')

const EXECUTE = Symbol('Execute')

class BaseCLIModel extends BaseModel {
  constructor(command, cliOptions, eventPrefix) {
    super(eventPrefix || command)

    this[EXECUTE] = new Execute(command, [], {
      cwd: app.getPath('home'),
      ...(cliOptions || {}),
    })
  }

  get ex() {
    return this[EXECUTE]
  }

  get execute() {
    return this[EXECUTE]
  }
}

module.exports = BaseCLIModel
