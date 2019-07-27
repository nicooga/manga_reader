import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import RegisterForm from './RegisterForm'

const App = _props => (
  <RegisterForm />
)

ReactDOM.render(<App />, document.getElementById('root'))
