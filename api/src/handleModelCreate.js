import { UserInputError } from 'apollo-server'

const extractValidationErrors = error => (
  error.errors.reduce((acc, err) => {
    acc[err.path] = acc[err.path] || []
    acc[err.path].push(err.message)
    return acc
  }, {})
)

const tryExtractValidationErrors = error => {
  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    throw new UserInputError(
      'Validation Error',
      { errors: extractValidationErrors(error) }
    )
  } else {
    console.log(error)
    return Promise.reject(error)
  }
}

const handleModelCreate = promise => promise.catch(tryExtractValidationErrors)

export default handleModelCreate
