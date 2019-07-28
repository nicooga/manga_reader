import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-final-form-hooks'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'

import { setCurrentUser } from './Auth'
import Form from './Form'
import Input from './Input'
import SubmitButton from './SubmitButton'
import extractValidationErrors from './extractValidationErrors'

const LOGIN_USER_MUTATION = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      user { email }
      token
    }
  }
`

const LoginForm = _props => {
  const [loginUser] = useMutation(LOGIN_USER_MUTATION)

  const { form, handleSubmit } = 
    useForm({
      onSubmit: formData => (
        loginUser({ variables: { input: formData } })
          .then(resp => {
            const { user, token } = resp.data.loginUser
            setCurrentUser({ user, token })
          })
          .catch(extractValidationErrors)
      )
    })

  return (
    <Form onSubmit={handleSubmit}>
      <Input form={form} name='email' label='Email' type='email' required />
      <Input form={form} name='password' label='Password' type='password' required />
      <SubmitButton>Login</SubmitButton>
    </Form>
  )
}

export default LoginForm
