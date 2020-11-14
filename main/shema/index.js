const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'types')))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, 'resolvers')))

module.exports = makeExecutableSchema({ typeDefs, resolvers })
