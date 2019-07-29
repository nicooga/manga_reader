import { createTestClient } from 'apollo-server-testing'
import gql from 'graphql-tag'

import MangaReaderServer from '@src/MangaReaderServer'
import registerUser from './registerUser'
import User from '@src/models/User'

jest.mock('@src/Auth', () => ({
  generateToken: payload => 'token',
  hashPassword: ({ password, salt }) => ({ password: 'hashedpassword', salt: 'salt' })
}))

const { query } = createTestClient(MangaReaderServer)

const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        id
        email
      }
      token
    }
  }
`

describe('registerUser mutation', () => {
  describe('when email is not taken', () => {
    it('returns then user and token', done => {
      query({
        query: REGISTER_USER,
        variables: {
          input: {
            email: 'asdf@email.com',
            password: 'password'
          }
        }
      })
        .then(resp => {
          const { user, token } = resp.data.registerUser

          expect(user.id).toMatch(/^\d+$/)
          expect(user.email).toEqual('asdf@email.com')
          expect(token).toEqual('token')

          return User.findByPk(user.id)
        })
        .then(user => {
          expect(typeof(user.id)).toEqual('number')
          expect(user.createdAt).toBeInstanceOf(Date)
          expect(user.updatedAt).toBeInstanceOf(Date)
          expect(user.email).toEqual('asdf@email.com')
          expect(user.password).toEqual('hashedpassword')

          done()
        })
    })
  })

  describe('when email is taken', () => {
    it('throws a validation error', done => {
      const email = 'some@email.com'
      const password = 'password'

      User
        .create({ email, password })
        .then(_ =>
          query({
            query: REGISTER_USER,
            variables: { input: { email, password }}
          })
        )
        .then(resp => {
          expect(resp.errors).toHaveLength(1)
          expect(resp.errors[0].message).toEqual('Validation Error')
          expect(resp.errors[0].extensions.exception.errors).toEqual({ email: ['email must be unique'] })

          return User.count()
        })
        .then(userCount => {
          expect(userCount).toEqual(1)
          done()
        })

    })
  })
})
