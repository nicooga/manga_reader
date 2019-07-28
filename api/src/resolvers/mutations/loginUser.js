import { UserInputError } from 'apollo-server'
import User from '@src/models/User'
import { generateToken, isPasswordMatch } from '@src/Auth'

const loginUser = (_root, { input }, _context) => (
  User
    .findOne({
      attributes: ['id', 'email', 'password', 'salt'],
      where: { email: input.email }
    })
    .then(user => {
      if (isPasswordMatch(user, input.password)) {
        return {
          token: generateToken({ userId: user.dataValues.id }),
          user: user.dataValues
        }
      } else {
        throw new UserInputError('Validation Error', {errors: {password: ['does not match'] }})
      }
    })
)

export default loginUser
