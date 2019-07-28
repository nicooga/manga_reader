import { gql } from 'apollo-server'

const typeDefs = gql`
  type User {
    id: ID!,
    email: String
  }

  type Manga {
    author: String,
    title: String,
    pages: [MangaPage]
  }

  type MangaPage {
    pictureUrl: String
  }

  input RegisterUserInput {
    email: String!,
    password: String!
  }

  type RegisterUserOutput {
    user: User!,
    token: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): RegisterUserOutput!
  }

  type Query {
    mangas: [Manga]
  }
`

export default typeDefs
