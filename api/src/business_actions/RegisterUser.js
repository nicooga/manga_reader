import BusinessAction from '@src/BusinessAction'
import User from '@src/models/User'
import { generateToken, hashPassword } from '@src/Auth'

class RegisterUser extends BusinessAction {
  runPerformWithinTransaction = true

  validationConstraints = {
    email: {
      presence: { allowEmpty: false },
      unique: { inModel: User, byAttribute: 'email' }
    },

    password: {
      presence: { allowEmpty: false },
      length: value => value && ({ minimum: 8 })
    }
  }

  async executePerform() {
    const user =
      await User.create({
        ...this.params,
        ...hashPassword(this.params.password)
      })

    return {
      user,
      token: generateToken({ userId: user.dataValues.id })
    }
  }
}

export default RegisterUser
