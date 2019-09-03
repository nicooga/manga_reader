import { Sequelize, sequelize } from '@src/db'
import MangaSeries from '@src/models/MangaSeries'

class MangaChapter extends Sequelize.Model {}

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
