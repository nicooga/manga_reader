const extractValidationErrors = errorData => (
  errorData
    .graphQLErrors
    .find(gqlError => gqlError.extensions.code === 'BAD_USER_INPUT')
    ?.extensions.exception.errors
)

export default extractValidationErrors
