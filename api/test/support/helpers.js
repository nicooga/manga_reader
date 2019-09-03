import sinon from 'sinon'
import mochaEach from 'mocha-each'
import { expect } from 'chai'
import { createTestClient } from 'apollo-server-testing'

import Server from '@src/Server'
import { sequelize } from '@src/db'
import { BusinesActionValidationError } from '@src/BusinessAction'
import * as GqlHelpers from '@src/GqlHelpers'

const truncate = table => sequelize.query(`TRUNCATE "${table}" RESTART IDENTITY CASCADE`)

export const truncateAll = async _ => {
  try {
    const [results] =
      await sequelize.query(`
        SELECT * FROM pg_catalog.pg_tables
        WHERE schemaname = 'public'
        AND tablename != 'SequelizeMeta'
      `)

    return await Promise.all(results.map(r => truncate(r.tablename)))
  } catch(error) {
    console.log('Error while truncanting tables', error)
    return Promise.reject(error)
  }
}

const { mutate } = createTestClient(Server)

export const createMutationPerformer =
  mutation => input => mutate({ mutation, variables: { input } })

export const expectValidationError = (resp, expectedErrors) => {
  expect(resp.errors).to.have.lengthOf(1)
  expect(resp.errors[0].message).toEqual('Validation Error')
  expect(resp.errors[0].extensions.exception.errors).toEqual(expectedErrors)
}

export const expectToRaiseBAValidationError = async (promise, expectedErrors) => {
  try {
    await promise
  } catch(error) {
    if (error instanceof BusinesActionValidationError) {
      expect(error).to.be.an.instanceOf(BusinesActionValidationError)
      expect(error.errors).to.deep.equal(expectedErrors)
    } else {
      throw(error)
    }
  }
}

export const createBAPerformer = (BA, { defaultAttributes }) => {
  let _defaultAttributes

  if (typeof defaultAttributes === 'function') {
    beforeEach(async () => {
      _defaultAttributes = await defaultAttributes()
    })
  } else {
    _defaultAttributes = defaultAttributes
  }

  const performer =
    (attributes = {}) => (
      new BA({
        ..._defaultAttributes,
        ...attributes
      })
        .perform()
    )

  return [performer, { defaultAttributes: _ => _defaultAttributes }]
}

export const testBAValidations = (performer, expectedInput) => (
  mochaEach(expectedInput).describe('when input is %j', (input, expectedErrors, options) => {
    it(`throws ${JSON.stringify(expectedErrors)}`, async () => {
      await(options && options.before && options.before())

      input
        |> performer(#)
        |> expectToRaiseBAValidationError(#, expectedErrors)
        |> await #
    })
  })
)
