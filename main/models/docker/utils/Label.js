class Label {
  constructor(str) {
    const [key, value] = `${str}`
      .trim()
      .split('=')
      .filter(s => !!s)

    this.key = key
    this.value = value
    this.original = str
  }

  static parse(str) {
    return `${str}`
      .trim()
      .split(',')
      .filter(s => !!s)
      .map(s => new Label(s))
  }
}

module.exports = Label
