import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET || 'development_secret'
const generateToken = (userId, payload) => jwt.sign({ userId, ...payload }, SECRET)

export { generateToken }
