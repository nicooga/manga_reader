import promiseFinallyPolyfill from 'promise.prototype.finally'
import fs from 'fs'
import { ApolloServer, gql } from 'apollo-server'

import resolvers from './resolvers'

promiseFinallyPolyfill.shim()

const Server = new ApolloServer({
  typeDefs: gql`${fs.readFileSync(__dirname.concat('/schema.graphql'))}`,
  resolvers
})

export default Server
