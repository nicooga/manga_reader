import { Sequelize, sequelize } from '@src/db'
import MangaChapter from '@scr/models/MangaChapter'

class MangaSeries extends Sequelize.Model {}

MangaSeries.hasMany(MangaChapter)

MangaSeries.init({
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  title:  {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { notEmpty: true }
  }
}, { sequelize })

export default MangaSeries
