import MangaReaderServer from './MangaReaderServer'

const PORT = process.env.port || 4000

MangaReaderServer.listen(PORT).then(({ url }) => console.log(`🚀  Server ready at ${url}`))
