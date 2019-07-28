import React from 'react'

import Button from './Button'
import { logout } from './Auth'

const LogoutButton = _props => (<Button onClick={logout}>Logout</Button>)

export default LogoutButton
