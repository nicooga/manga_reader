import { Sequelize, sequelize } from '@src/db'
import MangaSeries from '@src/models/MangaSeries'
import MangaPage from '@src/models/MangaPage'

class MangaChapter extends Sequelize.Model {}

//MangaChapter.belongsTo(MangaSeries)
//MangaChapter.hasMany(MangaPage)

MangaChapter.init({
  mangaSeriesId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  chapterNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  }
}, { sequelize })

export default MangaChapter
