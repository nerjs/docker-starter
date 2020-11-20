const { SchemaDirectiveVisitor } = require('graphql-tools')

const defs = {
  ARRAY: [],
  OBJECT: {},
  NULL: null,
  STRING: '',
  NUMBER: 0,
}

class IfParentDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {
      resolve,
      name,
      astNode: {
        type: { kind },
      },
    } = field

    const def = this.args.def && defs.hasOwnProperty(this.args.def) ? defs[this.args.def] : null

    if (kind === 'NonNullType' && def === null)
      throw new Error(`ifparent directive not use with NonNull. def=NULL. path: ${name}`)

    field.resolve = async (parent, ...args) => {
      return !parent[this.args.field] ? def : resolve ? resolve(parent, ...args) : parent[name]
    }
  }
}

module.exports = IfParentDirective
