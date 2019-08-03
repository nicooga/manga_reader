import { Sequelize, sequelize } from '@src/db'
import MangaChapter from '@src/MangaChapter'

class MangaPage extends Sequelize.Model {}

MangaPage.belongsTo(MangaChapter)

MangaPage.init({
  picture: {
    Sequelize.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  }
}, { sequelize })

export default MangaPage
