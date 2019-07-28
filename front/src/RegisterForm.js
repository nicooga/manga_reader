import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-final-form-hooks'
import gql from 'graphql-tag'
import { useMutation } from 'react-apollo-hooks'
import { setCurrentUser } from './Auth'

const REGISTER_USER_MUTATION = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        email
      }
      token
    }
  }
`

import Input from './Input'
import SubmitButton from './SubmitButton'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 10px;
`

const extractValidationErrors = errorData => (
  errorData
    .graphQLErrors
    .find(gqlError => gqlError.extensions.code === 'BAD_USER_INPUT')
    ?.extensions.exception.errors
)

const RegisterForm = _props => {
  const [registerUser] = useMutation(REGISTER_USER_MUTATION)

  const { form, handleSubmit } =
    useForm({
      onSubmit: formData => (
        registerUser({ variables: { input: formData } })
          .then(resp => {
            const { user, token } = resp.data.registerUser
            setCurrentUser({ user, token })
          })
          .catch(extractValidationErrors)
      )
    })

  return (
    <form onSubmit={handleSubmit}>
      <Root>
        <Input form={form} name='email' label='Email' type='email' required />
        <Input form={form} name='password' label='Password' type='password' required />
        <SubmitButton>Register</SubmitButton>
      </Root>
    </form>
  )
}

export default RegisterForm
