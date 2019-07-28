import { ApolloServer } from 'apollo-server'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const MangaReaderServer = new ApolloServer({ typeDefs, resolvers })

export default MangaReaderServer
