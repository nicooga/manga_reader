import sinon from 'sinon'
import { expect } from 'chai'
import { get } from 'lodash'

import * as GqlHelpers from '@src/GqlHelpers'
import RegisterUser from '@src/business_actions/RegisterUser'
import LoginUser from '@src/business_actions/LoginUser'
import CreateMangaChapter from '@src/business_actions/CreateMangaChapter'

let resolveWithBA

const reload = require('require-reload')(require)

const expectToResolveWithBA = (resolverPath, ba) => {
  it('resolves using business action', async () => {
    const randomFn = _ => {}
    resolveWithBA.withArgs(ba).returns(randomFn)

    // We need to reload the module because it uses resolveWithBA at definition time,
    // before it can be mocked for testing
    const resolvers = reload('@src/resolvers.js')
    const resolver = get(resolvers.default, resolverPath)

    expect(resolver).to.equal(randomFn)
  })
}

describe('resolvers', () =>  {
  let resolvers

  const sandbox = sinon.sandbox.create()

  before(() => { resolveWithBA = sandbox.stub(GqlHelpers, 'resolveWithBA') })
  after(() => sandbox.restore())

  describe('mutations', () => {
    expectToResolveWithBA('Mutation.registerUser', RegisterUser)
    expectToResolveWithBA('Mutation.loginUser', LoginUser)
    expectToResolveWithBA('Mutation.createMangaChapter', CreateMangaChapter)
  })
})
