import React from 'react'
import styled from 'styled-components'
import { useField } from 'react-final-form-hooks'

const Root = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`

const Label = styled.label`
  margin-bottom: 5px;
`

const ActualInput = styled.input`
  border: 1px solid lightgrey;
  border-radius: 3px;
  padding: 3px;
`

const Input = ({ form, name, label, type }) => {
  const { input } = useField(name, form)

  return (
    <Root>
      <Label htmlFor={name}>{label}</Label>
      <ActualInput
        {...input}
        placeholder={label}
        id={name}
        type={type}
      />
    </Root>
  )
}

export default Input
