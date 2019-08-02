import User from '@src/models/User'
import { generateToken, isPasswordMatch } from '@src/Auth'
import { throwValidationError } from '@src/ErrorHandling'

const loginUser = (_root, { input }, _context) => (
  User
    .findOne({
      attributes: ['id', 'email', 'password', 'salt'],
      where: { email: input.email }
    })
    .then(user => {
      if (!user) throwValidationError({ email: ['does not correspond to an existing user'] })
      if (!isPasswordMatch(user, input.password)) throwValidationError({ password: ['does not match'] })

      return {
        token: generateToken({ userId: user.id }),
        user: user
      }
    })
)

export default loginUser
