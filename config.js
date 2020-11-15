const path = require('path')
const electronIs = require('electron-is')
const Config = require('./utils/Config')

module.exports = new Config(
  [
    path.join(__dirname, 'configs', 'base.config.yml'),
    path.join(__dirname, 'configs', electronIs.dev() ? 'dev.config.yml' : 'prod.config.yml'),
    path.join(__dirname, 'configs', 'local.config.yml'),
  ],
  [
    { name: 'main', alias: 'm', type: Boolean },
    { name: 'graphiql', alias: 'g', type: Boolean },
    { name: 'reload', alias: 'r', type: Boolean },
  ],
)
