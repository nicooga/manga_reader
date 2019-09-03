import fs from 'fs'
import { ApolloServer, gql } from 'apollo-server'

import resolvers from './resolvers'

const Server = new ApolloServer({
  typeDefs: gql`${fs.readFileSync(__dirname.concat('/schema.graphql'))}`,
  resolvers
})

export default Server
