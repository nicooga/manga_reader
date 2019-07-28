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

  type UserAndToken {
    user: User!,
    token: String!
  }

  input LoginUserInput {
    email: String!,
    password: String!
  }

  type Mutation {
    registerUser(input: RegisterUserInput!): UserAndToken!
    loginUser(input: LoginUserInput!): UserAndToken!
  }

  type Query {
    mangas: [Manga]
  }
`

export default typeDefs
