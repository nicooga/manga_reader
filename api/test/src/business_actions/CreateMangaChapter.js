import { expect } from 'chai'

import { createBAPerformer, testBAValidations } from '@test_support/helpers'
import CreateMangaChapter from '@src/business_actions/CreateMangaChapter'
import MangaSeries from '@src/models/MangaSeries'
import MangaChapter from '@src/models/MangaChapter'
import MangaPage from '@src/models/MangaPage'

const author = 'Eiichiro Oda'
const title = 'One Piece'

describe('CreateMangaChapter#perform', () => {
  const [createMangaChapter, { defaultAttributes }] =
    createBAPerformer(CreateMangaChapter, {
      async defaultAttributes() {
        const { id: mangaSeriesId } = await MangaSeries.create({ author, title })

        return {
          mangaSeriesId,
          chapterNumber: 1,
          pictures: ['pic1', 'pic2']
        }
      }
    })

  testBAValidations(createMangaChapter, [
    [{ mangaSeriesId: 666 }, { mangaSeriesId: ['Manga series id does not match an existing record'] }],
    [{ chapterNumber: 0 }, { chapterNumber: ['Chapter number must be greater than 0'] }],
    [{ chapterNumber: undefined }, { chapterNumber: ['Chapter number can\'t be blank'] }],
    [{ pictures: undefined }, { pictures: ['Pictures can\'t be blank'] }],
    [{ pictures: [] }, { pictures: ['Pictures can\'t be blank'] }]
  ])

  describe('when attributes are valid', () => {
    it('creates manga chapter and returns it', async () => {
      const resp = await createMangaChapter()

      expect(resp.mangaSeriesId).to.equal(defaultAttributes().mangaSeriesId)
      expect(resp.series.id).to.equal(defaultAttributes().mangaSeriesId)
      expect(resp.id).to.equal(1)
      expect(resp.chapterNumber).to.equal(1)
      expect(resp.pages).to.have.lengthOf(2)
      expect(resp.pages[0].picture).to.equal('pic1')
      expect(resp.pages[1].picture).to.equal('pic2')

      const seriesCount = await MangaSeries.count()
      const chaptersCount = await MangaChapter.count()
      const pageCount = await MangaPage.count()

      expect(seriesCount).to.equal(1)
      expect(chaptersCount).to.equal(1)
      expect(pageCount).to.equal(2)

      const series = await MangaSeries.findByPk(resp.series.id)

      expect(series.author).to.equal(author)
      expect(series.title).to.equal(title)

      const chapter = await MangaChapter.findByPk(resp.id)

      expect(chapter.chapterNumber).to.equal(1)
    })
  })
})
