import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    email: String
  }

  type Mutation {
    registerUser(
      email: String!,
      password: String!
    ): User
  }

  type Manga {
    author: String,
    title: String,
    pages: [MangaPage]
  }

  type MangaPage {
    pictureUrl: String
  }

  type Query {
    mangas: [Manga]
  }
`

export default typeDefs
