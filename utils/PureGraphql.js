const { processGraphQLRequest } = require('apollo-server-core/dist/requestPipeline')
const { makeExecutableSchema } = require('graphql-tools')
const logger = require('nlogs')(module)

class PureGraphql {
  constructor({ schema, resolvers, typeDefs, schemaDirectives, parseOptions, context } = {}) {
    this.schema = schema || makeExecutableSchema({ resolvers, typeDefs, schemaDirectives, parseOptions })
    this.context = context
    this.config = {
      schema: this.schema,
    }
  }

  async resolve(request) {
    try {
      const _ctx = typeof this.context === 'function' ? this.context(request) : this.context
      const ctx = { ...(typeof _ctx === 'object' ? _ctx : { context: _ctx }), request }
      return await processGraphQLRequest(this.config, {
        context: ctx,
        request,
      })
    } catch (e) {
      logger.error(e)
      return {
        errors: [e],
      }
    }
  }
}

module.exports = PureGraphql
