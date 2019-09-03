import sinon from 'sinon'
import { expect } from 'chai'
import { UserInputError } from 'apollo-server'
import { BusinesActionValidationError } from '@src/BusinessAction'

import { resolveWithBA } from '@src/GqlHelpers'

const sandbox = sinon.createSandbox()

const randomInput = { random: 'input' }
const constructorSpy = sinon.spy()

class DummyBA {
  constructor(...args) { constructorSpy(...args) }
  perform() { }
}

const runResolver = _ => {
  const resolver = resolveWithBA(DummyBA)

  // We don't use root and context yet, but the resolver needs to accept them
  return resolver('_root', { input: randomInput }, '_context')
}

const stubReject = error => sandbox.stub(DummyBA.prototype, 'perform').returns(Promise.reject(error))
const stubResolve = value => sandbox.stub(DummyBA.prototype, 'perform').returns(Promise.resolve(value))

const runResolverAndCatchError = async _ => {
  let actualError
  try { await runResolver() } catch(e) { actualError = e }
  return actualError
}

describe('resolveWithBA', () => {
  afterEach(sandbox.restore)

  it('delegates to wrapped business action', async () => {
    const randomOutput = 'asdf'
    stubResolve(randomOutput)
    const result = await runResolver()
    expect(constructorSpy).to.have.been.calledWith(randomInput)
    expect(result).to.equal(randomOutput)
  })

  context('when business action throws an error', () => {
    context('and error is a BusinesActionValidationError', () => {
      it('reformats the error to GQL format', async () => {
        const error = new BusinesActionValidationError(DummyBA, { some: ['errors'] })
        stubReject(error)
        const actualError = await runResolverAndCatchError()
        expect(actualError).to.be.an.instanceof(UserInputError)
        expect(actualError.originalError).to.equal(error)
        expect(actualError.errorsPerField).to.equal(error.errors)
      })
    })

    context('and error is not a BusinesActionValidationError', () => {
      it('throws error', async () => {
        const error = new Error()
        stubReject(error)
        const actualError = await runResolverAndCatchError()
        expect(actualError).to.equal(error)
      })
    })
  })
})
