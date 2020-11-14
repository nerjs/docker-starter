require('dotenv').config()

const { APP_TYPE } = process.env

const configName = APP_TYPE || 'main'

module.exports = require(`./configs/${configName}`)
