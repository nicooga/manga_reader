import validate from '@src/validate'

import BusinessAction from '@src/BusinessAction'
import User from '@src/models/User'
import { generateToken, isPasswordMatch } from '@src/Auth'

class LoginUser extends BusinessAction {
  runPerformWithinTransaction = true

  validationConstraints = {
    email: {
      presence: { allowEmpty: false },
      email: true,
      matchesExistingRecord: { inModel: User, byAttribute: 'email' }
    },
    password: {
      presence: { allowEmpty: false },
      custom: {
        with: async value => {
          const user = await this.user()

          if (user && value && user.password !== value) {
            return 'does not match'
          }
        }
      }
    }
  }

  async executePerform() {
    const user = await this.user()

    return {
      token: generateToken({ userId: user.id }),
      user: user
    }
  }

  async user() {
    const { email } = this.params

    return email && User.findOne({
      attributes: ['id', 'email', 'password', 'salt'],
      where: { email }
    })
  }
}

export default LoginUser
