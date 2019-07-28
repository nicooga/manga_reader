import React  from 'react'
import styled from 'styled-components'

import { useAppState } from './StateManagement'
import ApolloProvider from './ApolloProvider'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

const Root = styled.div`
  font-family: 'Helvetica';
`

const AuthBox = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
    :not(:first-child) {
      margin-left: 30px;
    }
  }
`

const App = _props => {
  const currentUser = useAppState('currentUser')

  return (
    <ApolloProvider>
      <Root>
        {currentUser ? `Welcome ${currentUser.email}` : (
          <AuthBox>
            <div>
              You have an account? Then login
              <LoginForm />
            </div>

            <div>
              You are new around here? Please register
              <RegisterForm />
            </div>
          </AuthBox>
        )}
      </Root>
    </ApolloProvider>
  )
}

export default App
