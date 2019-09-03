import { UserInputError } from 'apollo-server'
import { BusinesActionValidationError } from '@src/BusinessAction'

// Apollo tells us to throw an `UserInputError` to signal a failure due to invalid user input
const tryReformatError = error => {
  if (!(error instanceof BusinesActionValidationError))
    return Promise.reject(error);

  throw new UserInputError('Validation Error', {
    originalError: error,
    errorsPerField: error.errors
  })
}

// Builds a resolver function using a business action
const resolveWithBA = BA => (_root, { input }, _context) => new BA(input).perform().catch(tryReformatError)

export { resolveWithBA }
