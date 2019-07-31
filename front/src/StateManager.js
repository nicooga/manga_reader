import ls from 'local-storage'
import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { pluck } from 'rxjs/operators'

class StateManager {
  state = new BehaviorSubject({})

  constructor({ cachedKeys } = {}) {
    if (cachedKeys) this.initializeCache(cachedKeys)
  }

  initializeCache(cachedKeys) {
    cachedKeys.forEach(key => {
      const lsKeyName  = `StateManager.cache[${key}]`
      const cachedValue = ls.get(lsKeyName)

      this.updateState({ [key]: cachedValue })
      this.pluck(key).subscribe(valueToCache => ls.set(lsKeyName, valueToCache))
    })

    this.updateState({ __cacheInitialized: true })
  }

  updateState(newState) {
    const currentState = this.state.getValue()
    this.state.next({ ...currentState, ...newState })
  }

  pluck(...keys) {
    return this.state.pipe(pluck(...keys))
  }

  useAppState(...keys) {
    return keys.map(key => useObservable(_ => this.pluck(key)))
  }
}

export default StateManager
