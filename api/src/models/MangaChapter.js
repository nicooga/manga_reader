import { Sequelize, sequelize } from '@src/db'
import MangaSeries from '@src/models/MangaSeries'
import MangaPage from '@src/models/MangaPage'

class MangaChapter extends Sequelize.Model {}

MangaChapter.belongsTo(MangaSeries)
MangaChapter.hasMany(MangaPage)

MangaChapter.init({
  chapterNumber: {
    Sequelize.INTEGER,
    allowNull: false,
    unique: true
  }
}, { sequelize })

export default MangaChapter
