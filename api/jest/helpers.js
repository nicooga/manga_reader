import { createTestClient } from 'apollo-server-testing'
import Server from '@src/Server'

const { mutate } = createTestClient(Server)

const createMutationPerformer = mutation => input => mutate({ mutation, variables: { input } })

const expectValidationError = (resp, expectedErrors) => {
  expect(resp.errors).toHaveLength(1)
  expect(resp.errors[0].message).toEqual('Validation Error')
  expect(resp.errors[0].extensions.exception.errors).toEqual(expectedErrors)
}

const mockObjectFn = (obj, fnName, mockGeneratorFn) => {
  const originalFn = obj[fnName]
  const mock = jest.fn()

  beforeEach(() => {
    obj[fnName] = mock
  })

  afterEach(() => {
    obj[fnName] = originalFn
  })

  return mock
}

export { expectValidationError, createMutationPerformer, mockObjectFn }
