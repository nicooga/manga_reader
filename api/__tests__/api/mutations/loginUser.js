import gql from 'graphql-tag'
import { createMutationPerformer, expectValidationError, mockObjectFn } from '@jest/helpers'
import User from '@src/models/User'
import * as Auth from '@src/Auth'

const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      user {
        id
        email
      }
      token
    }
  }
`

const loginUser = createMutationPerformer(LOGIN_USER)

describe('loginUser mutation', () => {
  const isPasswordMatch = mockObjectFn(Auth, 'isPasswordMatch')
  const generateToken = mockObjectFn(Auth, 'generateToken')

  describe('when user does not exist', () => {
    it('returns a validation error', done => {
      loginUser({ email: 'asdf@email.com', password: 'password' })
        .then(resp => {
          expectValidationError(resp, { email: ['does not correspond to an existing user'] })
          done()
        })
        .catch(done)
    })
  })

  describe('when user exists', () => {
    describe('when password does not match', () => {

      it('returns a validation error', done => {
        isPasswordMatch.mockReturnValue(false)

        User
          .create({ email: 'asdf@email.com', password: 'password', salt: 'salt' })
          .then(_ => loginUser({ email: 'asdf@email.com', password: 'not_password' }))
          .then(resp => {
            expectValidationError(resp, { password: ['does not match'] })
            done()
          })
          .catch(done)
      })
    })

    describe('when password matches', () => {
      it('returns user and token', done => {
        isPasswordMatch.mockReturnValue(true)
        generateToken.mockReturnValue('token')

        User
          .create({ email: 'asdf@email.com', password: 'password', salt: 'salt' })
          .then(_ => loginUser({ email: 'asdf@email.com', password: 'password' }))
          .then(resp => {
            const { user, token } = resp.data.loginUser

            expect(user.id).toMatch(/\d+/)
            expect(user.email).toEqual('asdf@email.com')
            expect(token).toEqual('token')

            done()
          })
          .catch(done)
      })
    })
  })
})
