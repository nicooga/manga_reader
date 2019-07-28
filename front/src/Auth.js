import ls from 'local-storage'
import { updateState } from './StateManagement'

const initAuthState = _ =>
  updateState({
    currentUser: ls.get('currentUser'),
    token: ls.get('token')
  })

const setCurrentUser = ({ user, token }) => {
  updateState({ currentUser: user, token })
  ls.set('currentUser', user)
  ls.set('token', token)
}

const logout = _ => {
  updateState({ currentUser: undefined, token: undefined })
  ls.remove('currentUser' )
  ls.remove('token')
}

export { setCurrentUser, logout, initAuthState }
