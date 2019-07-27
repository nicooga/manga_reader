import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Root = styled.div`
  background-color: tomato;
`

const App = _props => (<Root>Hello world</Root>)

ReactDOM.render(<App />, document.getElementById('root'))
