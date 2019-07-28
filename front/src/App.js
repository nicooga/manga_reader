import React  from 'react'
import styled from 'styled-components'

import { useAppState } from './StateManagement'
import ApolloProvider from './ApolloProvider'
import RegisterForm from './RegisterForm'

const Root = styled.div`
  font-family: 'Helvetica';
`

const App = _props => {
  const currentUser = useAppState('currentUser')

  return (
    <ApolloProvider>
      <Root>
        {currentUser ? `Welcome ${currentUser.email}` : <RegisterForm />}
      </Root>
    </ApolloProvider>
  )
}

export default App
