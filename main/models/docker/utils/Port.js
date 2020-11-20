const rgx = /^((?<address>[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})\:)?((?<port>[0-9]+)(\-(?<rangePort>[0-9]+))?)(\/(?<protocol>[a-zA-Z]{1,10}))?$/

class Port {
  constructor(str) {
    const matched = str.match(rgx)

    Object.entries((matched && matched.groups) || {}).forEach(([key, value]) => {
      if (!value) return
      this[key] = value
    })

    if (!this.port) throw new Error(`Port is missing (${str})`)
    this.port = Number(this.port)
    if (this.rangePort) {
      this.range = {
        from: this.port,
        to: Number(this.rangePort),
      }
      delete this.rangePort
    }

    this.protocol = (this.protocol || 'tcp').toLowerCase()

    this.original = str
  }
}

module.exports = Port
