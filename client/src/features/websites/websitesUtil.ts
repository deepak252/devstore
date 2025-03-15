import { validateUrl } from '@/utils/validators'
import { WebsiteFormError, WebsiteFormValues } from './websites.types'

export const validateWebsiteForm = (values: WebsiteFormValues) => {
  const errors: WebsiteFormError = {}
  const sourceCodeUrlError = validateUrl(values.sourceCodeUrl)
  const demoUrlError = validateUrl(values.demoUrl)

  if (!values.name?.trim()) {
    errors.name = 'Enter website name'
  }
  if (!values.icon?.trim() && !values.attachmentIcon) {
    errors.attachmentIcon = 'Upload website icon'
  }
  if (sourceCodeUrlError) {
    errors.sourceCodeUrl = 'Invalid source code URL'
  }
  if (demoUrlError) {
    errors.demoUrl = 'Invalid demo URL'
  }

  return errors
}
