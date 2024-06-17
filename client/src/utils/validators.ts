import { REGEX } from '@/constants'

export const isEmptyString = (value: string) => {
  return !value?.trim()?.length
}

export const validatePhone = (value: string) => {
  if (!value) {
    return 'Phone number is required'
  }
  if (!REGEX.PHONE.test(value)) {
    return 'Invalid phone number'
  }
}

export const validateUsername = (value: string) => {
  if (!value) {
    return "Username can't be empty"
  }
  if (value.length < 4) {
    return 'Username must contain at least 4 characters'
  }
  if (value.length > 20) {
    return 'Username should not contain more than 20 characters'
  }
  if (!REGEX.ALPHANUMERIC.test(value)) {
    return 'Username should contain only letters and numbers'
  }
}

export const validateEmail = (value: string) => {
  if (!value) {
    return "Email can't be empty"
  }
  if (!REGEX.EMAIL.test(value)) {
    return 'Invalid email ID'
  }
}

export const validateUsernameOrEmail = (value: string) => {
  if (!value) {
    return "Username/email can't be empty"
  }
}

export const validatePasswordSignIn = (value: string) => {
  if (!value) {
    return "Password can't be empty"
  }
}

export const validatePasswordSignUp = (value: string) => {
  if (!value) {
    return "Password can't be empty"
  }
  if (value.trim().length < 6) {
    return 'Password must contains at least 6 characters'
  }
}

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
) => {
  if (confirmPassword !== password) {
    return 'Password not match'
  }
}
