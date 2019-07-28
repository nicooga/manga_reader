import { updateState } from './StateManagement'

const setCurrentUser = ({ user, token }) => {
  updateState({ currentUser: user, token })
}

export { setCurrentUser }
