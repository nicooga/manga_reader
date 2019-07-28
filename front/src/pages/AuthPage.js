import React from 'react'
import styled from 'styled-components'

import RegisterForm from '../RegisterForm'
import LoginForm from '../LoginForm'

const Root = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
    :not(:first-child) {
      margin-left: 30px;
    }
  }
`

const AuthPage = _props => (
  <Root>
    <div>
      You have an account? Then login
      <LoginForm />
    </div>

    <div>
      You are new around here? Please register
      <RegisterForm />
    </div>
  </Root>
)

export default AuthPage
