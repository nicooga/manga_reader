import { BehaviorSubject } from 'rxjs'
import { useObservable } from 'rxjs-hooks'
import { pluck } from 'rxjs/operators'

const state = new BehaviorSubject({})

const updateState = newState => {
  const currentState = state.getValue()
  state.next({ ...currentState, ...newState })
}

const useAppState = key => useObservable(_ => state.pipe(pluck(key)))

export { updateState, useAppState }
