import User from '@src/models/User'
import { tryThrowValidationError } from '@src/ErrorHandling.js'
import { generateToken, hashPassword } from '@src/Auth'

const registerUser = (_root, { input }, _context) => (
  User
    .create({ ...input, ...hashPassword(input.password) })
    .then(user => ({
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email
      },
      token: generateToken({ userId: user.dataValues.id })
    }))
    .catch(tryThrowValidationError)
)

export default registerUser
