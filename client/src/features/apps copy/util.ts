import { AppFormError, AppFormValues } from './apps.types'
import { validateUrl } from '@/utils/validators'

export const validateAppForm = (values: AppFormValues) => {
  const errors: AppFormError = {}
  const urlError = validateUrl(values.sourceCode)

  if (!values.name?.trim()) {
    errors.name = 'Enter app name'
  }
  if (urlError) {
    errors.sourceCode = 'Invalid source code URL'
  }
  if (!values.attachmentPackage) {
    errors.attachmentPackage = 'Application package file is required'
  }
  if (!values.attachmentIcon) {
    errors.attachmentIcon = 'App icon is required'
  }
  if (!values.attachmentImages || !values.attachmentImages.length) {
    errors.attachmentImages = 'Upload at least one image'
  }
  return errors
}
