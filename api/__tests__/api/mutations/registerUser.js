import gql from 'graphql-tag'
import User from '@src/models/User'
import { createMutationPerformer, expectValidationError, mockObjectFn } from '@jest/helpers'
import * as Auth from '@src/Auth'

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

const registerUser = createMutationPerformer(REGISTER_USER)

describe('registerUser mutation', () => {
  mockObjectFn(Auth, 'generateToken')
    .mockReturnValue('token')

  mockObjectFn(Auth, 'hashPassword')
    .mockReturnValue({ password: 'hashed_password', salt: 'salt' })

  describe('when email is not taken', () => {
    it('returns user and token', done => {
      registerUser({ email: 'asdf@email.com', password: 'password' })
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
          expect(user.password).toEqual('hashed_password')

          done()
        })
        .catch(done)
    })
  })

  describe('when email is taken', () => {
    it('returns a validation error', done => {
      const email = 'some@email.com'
      const password = 'password'

      User
        .create({ email, password })
        .then(_ => registerUser({ email, password }))
        .then(resp => {
          expectValidationError(resp, { email: ['email must be unique'] })
          return User.count()
        })
        .then(userCount => expect(userCount).toEqual(1))
        .then(done)
        .catch(done)
    })
  })
})
