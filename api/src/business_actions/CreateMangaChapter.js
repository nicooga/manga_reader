import BusinessAction from '@src/BusinessAction'
import { sequelize } from '@src/db'
import MangaSeries from '@src/models/MangaSeries'
import MangaChapter from '@src/models/MangaChapter'
import MangaPage from '@src/models/MangaPage'

class CreateMangaChapter extends BusinessAction {
  _executePerform() {

  }
}

CreateMangaChapter.validates({
  chapterNumber: {
    presence: true,
    numericality: {
      greaterThan: 0
      onlyInteger: true
    }
  }
})

export default CreateMangaChapter
