import Joi from 'joi'
import { ICategory } from '../../types/category.types'
import { Platform } from '../../constants/enums'

const nameSchema = Joi.string().min(3).max(40)
const platformSchema = Joi.string().valid(...Object.values(Platform))

export const validateCreateCategory = (values: Partial<ICategory>) => {
  const schema = Joi.object({
    name: nameSchema.required(),
    platform: platformSchema.optional()
  })
  return schema.validate(values, { stripUnknown: true })
}
