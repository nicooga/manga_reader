import 'normalize.css'

import React, { useLayoutEffect }  from 'react'
import styled from 'styled-components'

import { useAppState } from './StateManagement'
import { initAuthState } from './Auth'
import ApolloProvider from './ApolloProvider'
import AuthPage from './pages/AuthPage'
import LogoutButton from './LogoutButton'

const Root = styled.div`
  font-family: 'Helvetica';
`

const App = _props => {
  const currentUser = useAppState('currentUser')

  useLayoutEffect(_ => { initAuthState() })

  return (
    <ApolloProvider>
      <Root>
        {currentUser ? <LogoutButton /> : <AuthPage />}
      </Root>
    </ApolloProvider>
  )
}

export default App
