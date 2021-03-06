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

const REGISTER_USER_MUTATION = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user { email }
      token
    }
  }
`

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
    <Form onSubmit={handleSubmit}>
      <Input form={form} name='email' label='Email' type='email' required />
      <Input form={form} name='password' label='Password' type='password' required />
      <SubmitButton>Register</SubmitButton>
    </Form>
  )
}

export default RegisterForm
