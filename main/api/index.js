const { ipcMain } = require('electron')
const { GQL_CHANNEL } = require('../../constants/api')
const gql = require('../gql')
if (process.env.NODE_ENV !== 'production') require('./playground')

ipcMain.on(GQL_CHANNEL, async (channel, { replyChannel, data }) => {
  channel.reply(replyChannel, await gql.resolve(data))
})
