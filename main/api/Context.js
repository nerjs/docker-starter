const { parse } = require('graphql')
const { BrowserWindow } = require('electron')

class IpcGqlContext {
  constructor(schema, channel, { operationName, query, variables }) {
    this.schema = schema
    this.channel = channel
    this.source = query
    this.query = parse(query)
    this.operationName = operationName
    this.variables = variables
  }

  get options() {
    return {
      schema: this.schema,
      contextValue: this,
      rootValue: null,
      variableValues: this.variables,
      operationName: this.operationName,
      document: this.query,
    }
  }

  get sender() {
    return this.channel.sender
  }

  get webContents() {
    return this.sender.webContents
  }

  get win() {
    return BrowserWindow.fromWebContents(this.webContents)
  }

  get title() {
    return this.webContents.getTitle()
  }

  get destroyed() {
    return this.webContents.isDestroyed()
  }

  reply(...args) {
    return (this.sender.reply || this.sender.send || this.webContents.send).apply(
      this.sender.reply || this.sender.send ? this.sender : this.webContents,
      args,
    )
  }
}

module.exports = IpcGqlContext
