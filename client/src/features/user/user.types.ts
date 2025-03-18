export type User = {
  _id: string
  fullname?: string
  username: string
  email: string
  title?: string
  headline?: string
  about?: string
  createdAt: string
  updatedAt: string
}

export type GeneralFormValues = {
  fullname?: string
  title?: string
  headline?: string
  about?: string
}

export type GeneralFormError = {
  fullname?: string
  title?: string
  headline?: string
  about?: string
}
