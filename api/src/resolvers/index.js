import { resolveWithBA } from '@src/GqlHelpers'
import RegisterUser from '@src/business_actions/RegisterUser'
import LoginUser from '@src/business_actions/LoginUser'
import CreateMangaChapter from '@src/business_actions/CreateMangaChapter'

const resolvers = {
  Mutation: {
    registerUser: resolveWithBA(RegisterUser),
    loginUser: resolveWithBA(LoginUser),
    createMangaChapter: resolveWithBA(CreateMangaChapter)
  }
}

export default resolvers

