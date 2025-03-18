import { RemoteFile } from '@/shared.types'

export type User = {
  _id: string
  fullname?: string
  username: string
  email: string
  title?: string
  headline?: string
  about?: string
  profileImage?: RemoteFile
  createdAt: string
  updatedAt: string
}

export type GeneralFormValues = {
  fullname?: string
  title?: string
  headline?: string
  about?: string
  attachmentProfileImage?: File
}

export type GeneralFormError = {
  fullname?: string
  title?: string
  headline?: string
  about?: string
  attachmentProfileImage?: string
}
