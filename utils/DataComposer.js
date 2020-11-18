class DataComposer {
  constructor() {
    this.rows = []
  }

  get size() {
    return this.rows.length
  }

  has() {
    return !!this.size
  }

  set(data) {
    this.rows.push(data)
  }

  get() {
    return this.rows.shift()
  }

  getAll() {
    return this.rows.splice(0, this.size)
  }

  first() {
    return this.getAll()[0]
  }

  last() {
    if (!this.has()) return undefined
    const arr = this.getAll()
    return arr[arr.length - 1]
  }

  clear() {
    this.getAll()
  }
}

module.exports = DataComposer
