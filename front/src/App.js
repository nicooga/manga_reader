import 'normalize.css'

import React, { useLayoutEffect }  from 'react'
import styled from 'styled-components'

import stateManager from './stateManager'
import { initAuthState } from './Auth'
import ApolloProvider from './ApolloProvider'
import AuthPage from './pages/AuthPage'
import LogoutButton from './LogoutButton'

const Root = styled.div`
  font-family: 'Helvetica';
`

const App = _props => {
  const [currentUser, __cacheInitialized] =
    stateManager.useAppState('currentUser', '__cacheInitialized')

  if (!__cacheInitialized) return null

  return (
    <ApolloProvider>
      <Root>
        {currentUser ? <LogoutButton /> : <AuthPage />}
      </Root>
    </ApolloProvider>
  )
}

export default App
