import { GeneralFormError, GeneralFormValues } from './user.types'

export const validateGeneralForm = (values: GeneralFormValues) => {
  const errors: GeneralFormError = {}

  if ((values.fullname?.length || 0) > 40) {
    errors.title = 'Title limit exceed'
  }

  if ((values.title?.length || 0) > 60) {
    errors.title = 'Title limit exceed'
  }

  if ((values.headline?.length || 0) > 100) {
    errors.title = 'Headline limit exceed'
  }
  if ((values.about?.length || 0) > 100) {
    errors.title = 'About limit exceed'
  }
  return errors
}
