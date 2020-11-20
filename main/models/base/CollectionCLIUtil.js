const lodashGet = require('lodash.get')
const { parseList } = require('../utils/parsers')
const BaseCLIUtil = require('./BaseCLIUtil')

const CLASS_ITEM = Symbol('Class item')

class CollectionCLIUtil extends BaseCLIUtil {
  constructor(parent, cliArgs, ClassItem, options) {
    super(parent, cliArgs, {
      default: [],
      parse: parseList,
      timeout: 20000,
      ...(options || {}),
    })

    this[CLASS_ITEM] = ClassItem
  }

  get ClassItem() {
    return this[CLASS_ITEM]
  }

  update(...mdw) {
    return super.update(items => items.map(item => new this.ClassItem(item, this)), ...mdw)
  }

  async filterBy(schemaFields) {
    if (arguments.length > 1 && typeof schemaFields === 'string') return this.filterBy({ [arguments[0]]: arguments[1] })

    const list = await this.get()

    return list.filter(item => Object.entries(schemaFields).every(([key, value]) => lodashGet(item, key) === value))
  }

  async getBy(schemaFields) {
    if (arguments.length > 1 && typeof schemaFields === 'string') return this.getBy({ [arguments[0]]: arguments[1] })

    const list = await this.get()
    return list.find(item => Object.entries(schemaFields).every(([key, value]) => lodashGet(item, key) === value))
  }

  getById(id) {
    return this.getBy('id', id)
  }

  getByName(name) {
    return this.getBy('name', name)
  }
}

module.exports = CollectionCLIUtil
