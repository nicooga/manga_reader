import { UserInputError } from 'apollo-server'
import User from '@src/models/User'
import { generateToken } from '@src/Auth'

const loginUser = (_root, args, _context) => (
  User
    .findOne({
      attributes: ['id', 'email', 'password'],
      where: { email: args.input.email }
    })
    .then(user => {
      if (args.input.password === user.password) {
        console.log(user)

        return {
          token: generateToken({ userId: user.dataValues.id }),
          user: user.dataValues
        }
      } else {
        throw new UserInputError('Validation Error', {errors: {password: 'does not match' }})
      }
    })
)

export default loginUser
