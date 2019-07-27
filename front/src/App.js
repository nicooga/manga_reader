import React from 'react'
import styled from 'styled-components'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo-hooks'

import RegisterForm from './RegisterForm'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache(),
})

const Root = styled.div`
  font-family: 'Helvetica';
`

const App = _props => (
  <ApolloProvider client={client}>
    <Root>
      <RegisterForm />
    </Root>
  </ApolloProvider>
)

export default App
