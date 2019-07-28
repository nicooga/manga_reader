import crypto from 'crypto'
import rand from 'csprng'
import jwt from 'jsonwebtoken'

import secret from '@src/secret'

const generateToken = (userId, payload) => jwt.sign({ userId, ...payload }, secret)

const createSalt = _ => rand(120, 32)

const hashPassword = (password, salt = createSalt()) => {
  const hash = crypto.createHash('sha256')

  hash.write(password)
  hash.write(salt)

  return {
    salt,
    password: hash.digest('base64'),
  }
}

const isPasswordMatch = (user, password) =>
  user.dataValues.password === hashPassword(password, user.dataValues.salt).password

export { generateToken, hashPassword, isPasswordMatch }
