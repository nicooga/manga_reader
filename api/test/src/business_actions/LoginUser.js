import sinon from 'sinon'
import { expect } from 'chai'

import { createBAPerformer, testBAValidations } from '@test_support/helpers'
import LoginUser from '@src/business_actions/LoginUser'
import User from '@src/models/User'
import * as Auth from '@src/Auth'

const email = 'someEmail@someDomain.com'
const password = 'password'

describe('LoginUser#perform', () => {
  const sandbox = sinon.sandbox.create()

  before(() => sandbox.stub(Auth, 'generateToken').returns('token'))
  after(() => sandbox.restore())

  const [loginUser] =
    createBAPerformer(LoginUser, { defaultAttributes: { email, password }})

  beforeEach(() => User.create({ email, password }))

  testBAValidations(loginUser, [
    [{ email: undefined }, { email: [ "Email can't be blank", ]}],
    [{ email: '' }, { email: [ 'Email can\'t be blank', 'Email is not a valid email' ]}],
    [{ password: undefined }, { password: ['Password can\'t be blank'] }],
    [{ password: '' }, { password: ['Password can\'t be blank'] }],
    [{ password: 'notpassword' }, { password: ['Password does not match'] }]
  ])

  describe('when input is valid', () => {
    it('succeeds', async () => {
      const resp = await loginUser()

      expect(resp.user.email).to.equal(email)
      expect(resp.user.password).to.equal(password)
      expect(resp.token).to.equal('token')
    })
  })
})
