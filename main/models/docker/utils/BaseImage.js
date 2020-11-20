class BaseImage {
  constructor(str) {
    const [name, tag] = str
      .trim()
      .split(':')
      .map(s => s.trim())
      .filter(s => !!s)

    this.name = name
    this.tag = tag || 'latest'
    this.original = str

    if (!this.name) throw new Error('Missing image name')
  }
}

module.exports = BaseImage
