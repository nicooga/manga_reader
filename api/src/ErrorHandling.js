import { UserInputError } from 'apollo-server'

// Takes a list of pre-formated validation errors and throws them
const throwValidationError = errors => {
  throw new UserInputError('Validation Error', { errors })
}

// Formats Sequelize validation errors to turn them
// into a map of fields pointing to the error messages
const extractValidationErrors = error => (
  error.errors.reduce((acc, err) => {
    acc[err.path] = acc[err.path] || []
    acc[err.path].push(err.message)
    return acc
  }, {})
)

// Examines error object to check whether it is a validation error from Sequelize.
// If so, formats the validation errors in the way the frontend expects them
// and throws an `UserInputError` for graphql to do the rest.
const tryThrowValidationError = error => {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    error
      |> extractValidationErrors
      |> throwValidationError
  } else {
    throw error
  }
}

export { tryThrowValidationError, throwValidationError }
