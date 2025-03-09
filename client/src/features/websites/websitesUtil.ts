import { validateUrl } from '@/utils/validators'
import { WebsiteFormError, WebsiteFormValues } from './websites.types'

export const validateWebsiteForm = (values: WebsiteFormValues) => {
  const errors: WebsiteFormError = {}
  const urlError = validateUrl(values.sourceCodeUrl)

  if (!values.name?.trim()) {
    errors.name = 'Enter website name'
  }
  if (!values.icon?.trim() && !values.attachmentIcon) {
    errors.attachmentIcon = 'Upload website icon'
  }
  if (urlError) {
    errors.sourceCodeUrl = 'Invalid source code URL'
  }

  return errors
}
