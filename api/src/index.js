const { ApolloServer, gql, UserInputError } = require('apollo-server');

const fakeUsersDB = []

const typeDefs = gql`
  type User {
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

  type Mutation { 
    registerUser(email: String, password: String): User
  }

  type Query {
    mangas: [Manga]
  }
`

const resolvers = {
  Mutation: {
    registerUser: (root, args, context) => {
      if (fakeUsersDB.find(u => u.email === args.email)) {
        throw new UserInputError('Validation Error', {
          errors: { email: [`Email "${args.email}" taken`] }
        })
      }

      const user = {
        email: args.email,
        password: args.password
      }

      fakeUsersDB.push(user)

      return user
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`))
