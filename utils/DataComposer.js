class DataComposer {
  constructor(maxSaveItems) {
    this.maxSaveItems = maxSaveItems
    this.rows = []
  }

  get size() {
    return this.rows.length
  }

  has() {
    return !!this.size
  }

  leave(count) {
    if (this.size >= count) return []
    return this.rows.splice(0, this.size - count)
  }

  set(data) {
    this.rows.push(data)
    if (this.maxSaveItems) this.leave(this.maxSaveItems)
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
