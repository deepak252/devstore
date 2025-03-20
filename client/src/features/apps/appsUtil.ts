import { validateUrl } from '@/utils/validators'
import { AppFormError, AppFormValues } from './apps.types'

export const validateAppForm = (values: AppFormValues) => {
  const errors: AppFormError = {}
  const sourceCodeUrlError = validateUrl(values.sourceCodeUrl)
  const demoUrlError = validateUrl(values.demoUrl)

  if (!values.name?.trim()) {
    errors.name = 'Enter app name'
  }
  if (!values.icon?.trim() && !values.attachmentIcon) {
    errors.attachmentIcon = 'Upload app icon'
  }
  if (sourceCodeUrlError) {
    errors.sourceCodeUrl = 'Invalid source code URL'
  }
  if (demoUrlError) {
    errors.demoUrl = 'Invalid demo URL'
  }

  return errors
}
