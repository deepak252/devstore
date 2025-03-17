import { GeneralFormError, GeneralFormValues } from './user.types'

export const validateGeneralForm = (values: GeneralFormValues) => {
  const errors: GeneralFormError = {}

  if ((values.title?.length || 0) > 40) {
    errors.title = 'Title limit exceed'
  }

  return errors
}
