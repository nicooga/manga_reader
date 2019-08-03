import { sequelize } from '@src/db'
import { throwValidationError } from '@src/ErrorHandling'
import MangaSeries from '@src/models/MangaSeries'
import MangaChapter from '@src/models/MangaChapter'
import MangaPage from '@src/models/MangaPage'

const findOrCreateMangaSeries = async ({ id, author, title }, transaction) => {
  if (id) {
    const series = await MangaSeries.findByPk(id, { transaction });

    if (series) return series;
    else throwValidationError({ mangaSeries: ['does not match an existing series'] });
  } else {
    if (author && title) {
      const existingMangaSeries =
        await MangaSeries.findOne(
          { where: { author, title } },
          { transaction }
        )

      if (existingMangaSeries) return existingMangaSeries;

      return await MangaSeries.create({ author, title }, { transaction })
    }
  }
}

const createMangaPages = ({ mangaChapterId, pictures }) =>
  pictures.map(picture => MangaPage.create({ mangaChapterId, picture }))
    |> Promise.all

const doCreateMangaChapter = async ({
  mangaSeriesId,
  mangaSeriesAuthor,
  mangaSeriesTitle,
  chapterNumber,
  pictures
}) => {
  if (!(mangaSeriesId || (mangaSeriesAuthor && mangaSeriesTitle))) {
    throwValidationError({
      mangaSeriesId: ['cannot be blank'],
      mangaSeriesAuthor: ['cannot be blank'],
      mangaSeriesTitle: ['cannot be blank']
    })
  }

  const mangaSeries =
    await sequelize.transaction(t => findOrCreateMangaSeries({
      id: mangaSeriesId,
      author: mangaSeriesAuthor,
      title: mangaSeriesTitle
    }, t))

  const mangaChapter =
    await sequelize.transaction(t => MangaChapter.create({
      mangaSeriesId: mangaSeries.id,
      chapterNumber
    }, { transaction: t }))

  const mangaPages = await createMangaPages({ mangaChapterId: mangaChapter.id, pictures })

  return {
    ...mangaChapter.dataValues,
    series: mangaSeries.dataValues,
    pages: mangaPages
  }
}

const createMangaChapter = (_root, { input }, _context) =>
  sequelize.transaction(_t => doCreateMangaChapter(input))

export default createMangaChapter
