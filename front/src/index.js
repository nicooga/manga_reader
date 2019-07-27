import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import RegisterForm from './RegisterForm'

const Root = styled.div`
  font-family: 'Helvetica';
`

const App = _props => (
  <Root>
    <RegisterForm />
  </Root>
)

ReactDOM.render(<App />, document.getElementById('root'))
