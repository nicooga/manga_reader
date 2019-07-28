import User from '@src/models/User'
import handleModelCreate from '@src/handleModelCreate.js'

const registerUser = (_root, args, _context) => handleModelCreate(User.create(args))

export default registerUser
