import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-final-form-hooks'

import Input from './Input'
import SubmitButton from './SubmitButton'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 10px;
`

const RegisterForm = _props => {
  const { form, handleSubmit } =
    useForm({
      onSubmit: formData => console.log(formData)
    })

  return (
    <form onSubmit={handleSubmit}>
      <Root>
        <Input form={form} name='email' label='Email'/>
        <Input form={form} name='password' label='Password' type='password'/>
        <SubmitButton>Register</SubmitButton>
      </Root>
    </form>
  )
}

export default RegisterForm
