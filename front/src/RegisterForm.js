import React from 'react'
import { useForm, useField } from 'react-final-form-hooks'

const RegisterForm = _props => {
  const { form, handleSubmit } =
    useForm({
      onSubmit: formData => console.log(formData)
    })

  const { input: emailInput } = useField('email', form)
  const { input: passwordInput } = useField('password', form)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input {...emailInput} placeholder='Email' id='email'/>
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input {...passwordInput} placeholder='Password' type='password' id='password'/>
      </div>

      <button type='submit'>Register</button>
    </form>
  )
}

export default RegisterForm
