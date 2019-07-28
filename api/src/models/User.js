import { Sequelize, sequelize } from '@src/db'

class User extends Sequelize.Model {}

User.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { sequelize })

export default User
