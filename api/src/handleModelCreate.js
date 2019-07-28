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
    error.message === 'Validation Error' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    throw new UserInputError(
      'Validation Error',
      { errors: extractValidationErrors(error) }
    )
  }
}

const handleModelCreate = promise =>
  promise
    .then(record => record.dataValues)
    .catch(tryExtractValidationErrors)

export default handleModelCreate
