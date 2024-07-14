import { CreateProjectFormData } from '@/shared.types'

export type CreateAppFormData = CreateProjectFormData & {
  attachmentPackage: File | null
}

export type CreateAppFormError = {
  name?: string
  attachmentPackage?: string
  attachmentIcon?: string
  attachmentImages?: string
}
