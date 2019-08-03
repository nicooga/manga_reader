import { Sequelize, sequelize } from '@src/db'
import MangaChapter from '@src/models/MangaChapter'

class MangaPage extends Sequelize.Model {}

//MangaPage.belongsTo(MangaChapter)

MangaPage.init({
  picture: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
}, { sequelize })

export default MangaPage
