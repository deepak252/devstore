import { GeneralFormError, GeneralFormValues } from './user.types'

export const validateGeneralForm = (values: GeneralFormValues) => {
  const errors: GeneralFormError = {}

  if ((values.fullname?.length || 0) > 40) {
    errors.fullname = 'Name should not contain more than 40 characters.'
  }

  if ((values.title?.length || 0) > 60) {
    errors.title = 'Title should not contain more than 60 characters.'
  }

  if ((values.headline?.length || 0) > 100) {
    errors.headline = 'Headline should not contain more than 100 characters.'
  }
  if ((values.about?.length || 0) > 4000) {
    errors.about = 'About should not contain more than 40000 characters.'
  }
  return errors
}
