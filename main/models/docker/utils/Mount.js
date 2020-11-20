class Mount {
  constructor(str) {
    const hasPath = !!~str.indexOf('/')

    if (hasPath) {
      this.source = str
    } else {
      this.id = str
    }
  }

  static parse(str) {
    return `${str}`
      .trim()
      .split(',')
      .map(s => s.trim())
      .filter(s => !!s)
      .map(s => new Mount(s))
  }
}

module.exports = Mount
