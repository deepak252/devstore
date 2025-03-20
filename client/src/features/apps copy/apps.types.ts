import { ProjectFormError, ProjectFormValues } from '@/shared.types'

export type AppFormValues = ProjectFormValues & {
  attachmentPackage: File | null
}

export type AppFormError = ProjectFormError & {
  attachmentPackage?: string
}
