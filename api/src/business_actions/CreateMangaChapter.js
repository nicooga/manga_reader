import BusinessAction from '@src/BusinessAction'
import MangaSeries from '@src/models/MangaSeries'
import MangaChapter from '@src/models/MangaChapter'
import MangaPage from '@src/models/MangaPage'

class CreateMangaChapter extends BusinessAction {
  runPerformWithinTransaction = true

  validationConstraints = {
    mangaSeriesId: {
      presence: { allowEmpty: false },
      matchesExistingRecord: { inModel: MangaSeries }
    },
    chapterNumber: {
      presence: { allowEmpty: false },
      numericality: { greaterThan: 0 }
    },
    pictures: {
      presence: true,
      aryLength: { lessThan: 0 }
    }
  }

  async executePerform() {
    const { mangaSeriesId } = this.params
    const chapter = await this.createChapter()
    if(!chapter) return
    const pages = await this.createPages(chapter.id)
    if(!pages) return
    const series = await MangaSeries.findByPk(mangaSeriesId)

    return { ...chapter.dataValues, series, pages }
  }

  async createChapter() {
    const { chapterNumber, mangaSeriesId } = this.params

    return MangaChapter.create(
      { mangaSeriesId, chapterNumber },
      { transaction: this.transaction }
    )
  }

  async createPages(mangaChapterId) {
    const { pictures } = this.params

    return (
      pictures.map((picture, index) =>
        MangaPage.create({ mangaChapterId, picture }, { transaction: this.transaction })
      )
      |> Promise.all
    )
  }
}

export default CreateMangaChapter
