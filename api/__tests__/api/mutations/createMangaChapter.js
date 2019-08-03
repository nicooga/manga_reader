import gql from 'graphql-tag'

import { createMutationPerformer, expectValidationError, mockObjectFn } from '@jest/helpers'
import MangaSeries from '@src/models/MangaSeries'

const CREATE_MANGA_CHAPTER = gql`
  mutation createMangaChapter($input: CreateMangaChapterInput!){
    createMangaChapter(input: $input) {
      id
      chapterNumber
      series {
        id
        author
        title
      }
      pages {
        id
        picture
      }
    }
  }
`

const createMangaChapter = createMutationPerformer(CREATE_MANGA_CHAPTER)

const expectMangaChapter = (resp, fn) => {
  const mangaChapter = resp.data.createMangaChapter

  expect(mangaChapter.id).toMatch(/^\d+$/)
  expect(mangaChapter.chapterNumber).toEqual(1)

  expect(mangaChapter.series.id).toMatch(/^\d+$/)
  expect(mangaChapter.series.author).toEqual('Eiichiro Oda')
  expect(mangaChapter.series.title).toEqual('One Piece')

  expect(mangaChapter.pages).toHaveLength(2)
  expect(mangaChapter.pages[0].id).toMatch(/^\d+$/)

  expect(mangaChapter.pages[0].picture).toEqual('pic1')

  expect(mangaChapter.pages[1].id).toMatch(/^\d+$/)
  expect(mangaChapter.pages[1].picture).toEqual('pic2')

  fn && fn(mangaChapter)
}

describe('createMangaChapter mutation', () => {
  describe('when mangaSeriesAuthor and mangaSeriesTitle were passed', () => {
    describe('and they do not duplicate an existing series', () => {
      it('creates the series, the chapter and the pages', async done => {
        const resp =
          await createMangaChapter({
            mangaSeriesAuthor: 'Eiichiro Oda',
            mangaSeriesTitle: 'One Piece',
            chapterNumber: 1,
            pictures: ['pic1', 'pic2']
          })

        expectMangaChapter(resp)

        done()
      })
    })

    describe('and it duplicates an existing series', () => { 
      it('creates the series, the chapter and the pages', async done => {
        const author = 'Eiichiro Oda'
        const title = 'One Piece'

        const mangaSeries = await MangaSeries.create({ author, title })

        const resp =
          await createMangaChapter({
            mangaSeriesAuthor: author,
            mangaSeriesTitle: title,
            chapterNumber: 1,
            pictures: ['pic1', 'pic2']
          })

        expectMangaChapter(resp, mangaChapter =>
          expect(mangaChapter.series.id).toEqual(mangaSeries.id.toString())
        )

        done()
      })
    })
  })

  describe('and mangaSeries.id was passed', () => {
    describe('and it matches with an existing manga series', () => {
      it('creates the chapter for the given series', async done => {
        const series =
          await MangaSeries.create({ 
            author: 'Eiichiro Oda',
            title: 'One Piece',
          })

        const resp =
          await createMangaChapter({
            mangaSeriesId: series.id,
            chapterNumber: 1,
            pictures: ['pic1', 'pic2']
          })

        expectMangaChapter(resp)

        done()
      })
    })

    describe('and it does not match an existing manga series', () => {
      it('returns a validation error error on mangaSeries field', async done => {
        const resp =
          await createMangaChapter({
            mangaSeriesId: 666,
            chapterNumber: 1,
            pictures: ['pic1', 'pic2']
          })

        expectValidationError(resp, { mangaSeries: ['does not match an existing series'] })

        done()
      })
    })
  })

  describe('when no series attributes are passed', () => {
    it('returns a validation error on mangaSeries field', async done => {
      const resp =
        await createMangaChapter({
          chapterNumber: 9,
          pictures: ['pic1', 'pic2']
        })

      expectValidationError(resp, {
        mangaSeriesId: ['cannot be blank'],
        mangaSeriesAuthor: ['cannot be blank'],
        mangaSeriesTitle: ['cannot be blank']
      })

      done()
    })
  })

  //describe('when chapterNumber is not passed', () => {
    //it('returns a validation error on chapterNumber field', () => {
      //const resp =
        //await createMangaChapter({
          //chapterNumber: 1
        //})
    //})
  //})
})
