import { ProjectFormError, ProjectFormValues } from '@/shared.types'
import { validateUrl } from '@/utils/validators'

export const validateProjectForm = (values: ProjectFormValues) => {
  const errors: ProjectFormError = {}
  const sourceCodeUrlError = validateUrl(values.sourceCodeUrl)
  const demoUrlError = validateUrl(values.demoUrl)

  if (!values.name?.trim()) {
    errors.name = 'Enter project name'
  }
  if (!values.icon?.trim() && !values.attachmentIcon) {
    errors.attachmentIcon = 'Upload project icon'
  }
  if (sourceCodeUrlError) {
    errors.sourceCodeUrl = 'Invalid source code URL'
  }
  if (demoUrlError) {
    errors.demoUrl = 'Invalid demo URL'
  }

  return errors
}
