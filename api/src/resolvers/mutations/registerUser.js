import User from '@src/models/User'
import handleModelCreate from '@src/handleModelCreate.js'
import { generateToken, hashPassword } from '@src/Auth'

const registerUser = (_root, { input }, _context) => {
  const { password, salt } = hashPassword(input.password)

  return handleModelCreate(User.create({ ...input, password, salt }))
    .then(user => ({
      user: {
        id: user.dataValues.id,
        email: user.dataValues.email
      },
      token: generateToken({ userId: user.dataValues.id })
    }))
}

export default registerUser
