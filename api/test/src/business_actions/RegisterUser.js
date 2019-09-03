import { expect } from 'chai'
import sinon from 'sinon'

import { createBAPerformer, testBAValidations } from '@test_support/helpers'
import RegisterUser from '@src/business_actions/RegisterUser'
import User from '@src/models/User'
import * as Auth from '@src/Auth'

const email = 'someEmail@someDomain.com'
const password = 'password'

describe('RegisterUser#perform', () => {
  const sandbox = sinon.sandbox.create()

  before(() => {
    sandbox.stub(Auth, 'hashPassword').returns({ password: 'password', salt: 'salt' })
    sandbox.stub(Auth, 'generateToken').returns('token')
  })

  after(() => sandbox.restore())

  const [registerUser] =
    createBAPerformer(RegisterUser, { defaultAttributes: { email, password }})

  testBAValidations(registerUser, [
    [{ email: undefined }, { email: ['Email can\'t be blank'] }],
    [{ email: '' }, { email: ['Email can\'t be blank'] }],
    [{ email}, { email: ['Email is taken'] }, { before: async _ => User.create({ email, password }) }],
    [{ password: undefined }, { password: ['Password can\'t be blank'] }],
    [{ password: '' }, { password: ['Password can\'t be blank'] }],
    [{ password: 'a' }, { password: ['Password is too short (minimum is 8 characters)'] }],
  ])

  describe('when input is valid', () => {
    it('succeeds', async () => {
      const resp = await registerUser()

      expect(resp.user.email).to.equal(email)
      expect(resp.user.password).to.equal(password)
      expect(resp.token).to.equal('token')
    })
  })
})
