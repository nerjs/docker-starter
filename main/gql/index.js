const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const path = require('path')
const PureGraphql = require('../../utils/PureGraphql')

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'types')))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, 'resolvers')))

module.exports = new PureGraphql({ typeDefs, resolvers })
