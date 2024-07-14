import {
  SignInFormError,
  SignInFormValues,
  SignUpFormError,
  SignUpFormValues,
} from './auth.types'

import {
  validateEmail,
  validatePasswordSignUp,
  validateUsername,
  validateUsernameOrEmail,
} from '@/utils/validators'

export const validateSignInForm = (values: SignInFormValues) => {
  const errors: SignInFormError = {}
  const ueError = validateUsernameOrEmail(values.usernameOrEmail)
  if (ueError) {
    errors.usernameOrEmail = ueError
  }
  if (!values.password) {
    errors.password = 'Password is required'
  }
  return errors
}

export const validateSignUpForm = (values: SignUpFormValues) => {
  const errors: SignUpFormError = {}
  const emailErr = validateEmail(values.email)
  const usernameErr = validateUsername(values.username)
  const passwordErr = validatePasswordSignUp(values.password)
  if (emailErr) {
    errors.email = emailErr
  }
  if (usernameErr) {
    errors.username = usernameErr
  }
  if (passwordErr) {
    errors.password = passwordErr
  }
  return errors
}
