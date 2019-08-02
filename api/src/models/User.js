import { Sequelize, sequelize } from '@src/db'

class User extends Sequelize.Model {}

User.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },

  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  salt: {
    type: Sequelize.STRING,
    allowNull: true,
  }
}, { sequelize })

export default User
