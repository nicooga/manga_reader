import 'normalize.css'

import React  from 'react'
import styled from 'styled-components'

import { useAppState } from './StateManagement'
import { initAuthState } from './Auth'
import ApolloProvider from './ApolloProvider'
import AuthPage from './pages/AuthPage'
import LogoutButton from './LogoutButton'

initAuthState()

const Root = styled.div`
  font-family: 'Helvetica';
`

const App = _props => {
  const currentUser = useAppState('currentUser')

  return (
    <ApolloProvider>
      <Root>
        {currentUser ? <LogoutButton /> : <AuthPage />}
      </Root>
    </ApolloProvider>
  )
}

export default App
