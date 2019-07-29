import { createTestClient } from 'apollo-server-testing'
import MangaReaderServer from '@src/MangaReaderServer'
import { sequelize } from '@src/db'

const { mutate } = createTestClient(MangaReaderServer)

const createMutationPerformer = mutation => input => mutate({ mutation, variables: { input } })

const expectValidationError = (resp, expectedErrors) => {
  expect(resp.errors).toHaveLength(1)
  expect(resp.errors[0].message).toEqual('Validation Error')
  expect(resp.errors[0].extensions.exception.errors).toEqual(expectedErrors)
}

const truncate = table => sequelize.query(`DELETE FROM "${table}"`)

const truncateAll = _ => (
  sequelize
    .query(`
      SELECT * FROM pg_catalog.pg_tables
      WHERE schemaname = 'public'
      AND tablename != 'SequelizeMeta'
    `)
    .then(([results]) => Promise.all(results.map(r => truncate(r.tablename))))
    .catch((...args) => { console.log('Error while truncanting tables', args) })
)

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

export { expectValidationError, createMutationPerformer, truncateAll, mockObjectFn }
