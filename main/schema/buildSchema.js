const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')

module.exports = () => {
  const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'types')))
  const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, 'resolvers')))
  const schemaDirectives = require('./directives')


  return makeExecutableSchema({ typeDefs, resolvers, schemaDirectives })
}
