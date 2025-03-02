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
} from '@/utils/validators'

export const validateSignInForm = (values: SignInFormValues) => {
  const errors: SignInFormError = {}
  if (!values.usernameOrEmail.trim()) {
    errors.usernameOrEmail = 'Enter username or email'
  }
  if (!values.password.trim()) {
    errors.password = "Password can't be empty"
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
