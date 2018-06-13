import path from 'path'
import { makeExecutableSchema } from 'graphql-tools'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'

const typesArray = fileLoader(path.join(__dirname, '**/types.gql'))
const resolversArray = fileLoader(path.join(__dirname, '**/resolvers.js'))

const typeDefs = mergeTypes(typesArray)
const resolvers = mergeResolvers(resolversArray)

const a = 'bc'

export default makeExecutableSchema({ typeDefs, resolvers })
