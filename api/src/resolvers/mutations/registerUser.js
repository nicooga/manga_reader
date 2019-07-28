import User from '@src/models/User'
import handleModelCreate from '@src/handleModelCreate.js'
import { generateToken } from '@src/Auth'

const registerUser = (_root, args, _context) =>
  handleModelCreate(User.create(args.input))
    .then(user => ({
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email
      },
      token: generateToken({ userId: user.dataValues.id })
    }))

export default registerUser
