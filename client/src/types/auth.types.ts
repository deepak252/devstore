export type SignInPayload = {
  usernameOrEmail: string
  password: string
}

export type SignUpPayload = {
  email: string
  username: string
  password: string
}

// Sign In Form
export type SignInFormValues = SignInPayload & {
  isPasswordVisible?: boolean
}
export type SignInFormError = {
  usernameOrEmail?: string
  password?: string
}

// Sign Up Form
export type SignUpFormValues = SignUpPayload & {
  isPasswordVisible?: boolean
}
export type SignUpFormError = {
  email?: string
  username?: string
  password?: string
}
