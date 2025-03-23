import Joi from 'joi'
import { ICategory } from '../../types/category.types'
import { Platform } from '../../constants/enums'
import { IBanner } from '../../types/banner.types'

const nameSchema = Joi.string().min(3).max(40)
const platformSchema = Joi.string().valid(...Object.values(Platform))
const platformsSchema = Joi.array().items(
  Joi.string().valid(...Object.values(Platform))
)
const imgSchema = Joi.string()
const redirectUrlSchema = Joi.string().uri()

export const validateCreateCategory = (values: Partial<ICategory>) => {
  const schema = Joi.object({
    name: nameSchema.required(),
    platform: platformSchema.optional()
  })
  return schema.validate(values, { stripUnknown: true })
}

export const validateCreateBanner = (values: Partial<IBanner>) => {
  const schema = Joi.object({
    img: imgSchema.required(),
    redirectUrl: redirectUrlSchema.required(),
    platforms: platformsSchema.optional()
  })
  return schema.validate(values, { stripUnknown: true })
}
