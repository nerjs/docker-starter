const Port = require('./Port')

class Ports {
  constructor(str) {
    const [binding, expose] = str.split('->').filter(s => !!s)

    if (!binding && !expose) throw new Error('Missing ports data')

    this.expose = new Port(expose || binding)
    this.binding = expose ? new Port(binding) : null
    this.original = str
  }

  static parse(str) {
    if (!str) return []
    return str
      .split(',')
      .map(s => s.trim())
      .filter(s => !!s)
      .map(s => new Ports(s))
  }
}

module.exports = Ports
