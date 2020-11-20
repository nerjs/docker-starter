const rgx = /^(?<type>[a-zA-Z]+)(\s\((?<code>[0-9]+)\))?(\s(?<details>(.*)))?$/

class ContainerStatus {
  constructor(str = '') {
    const matched = str.match(rgx)
    const { type, code, details } = (matched && matched.groups) || {}

    if (!type) throw new Error(`Неизвестный статус контейнера: ${type} (${str})`)
    this.type = type.toLowerCase()
    if (code) {
      this.code = Number(code)
    }
    this.details = details
    this.original = str
  }
}

module.exports = ContainerStatus
