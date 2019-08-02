import ls from 'local-storage'
import stateManager from './stateManager'

const setCurrentUser = ({ user, token }) => stateManager.updateState({ currentUser: user, token })
const logout = _ => stateManager.updateState({ currentUser: null, token: null })

export { setCurrentUser, logout }
