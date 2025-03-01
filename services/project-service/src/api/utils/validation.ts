import Joi from 'joi'
import { IProject } from '../../types/project.types'
import { ProjectType } from '../../constants/enums'

const projectTypeSchema = Joi.string().valid(...Object.values(ProjectType))
const projectNameSchema = Joi.string().min(4).max(80)
const isPrivateSchema = Joi.boolean()
const descriptionSchema = Joi.string().allow('').max(2000)
const iconSchema = Joi.string().allow('')
const videoSchema = Joi.string().allow('')
const featureGraphicSchema = Joi.string().allow('')
const imagesSchema = Joi.array<string>().max(5)
const demoUrlSchema = Joi.string().uri().allow('')
const sourceCodeUrlSchema = Joi.string().uri().allow('')

export const validateCreateProject = (values: Partial<IProject>) => {
  const schema = Joi.object({
    type: projectTypeSchema.required(),
    name: projectNameSchema.required(),
    isPrivate: isPrivateSchema.required(),
    description: descriptionSchema.optional(),
    icon: iconSchema.optional(),
    video: videoSchema.optional(),
    featureGraphic: featureGraphicSchema.optional(),
    images: imagesSchema.optional(),
    demoUrl: demoUrlSchema.optional(),
    sourceCodeUrl: sourceCodeUrlSchema.optional()
  })
  return schema.validate(values, { stripUnknown: true })
}

export const validateUpdateProject = (values: Partial<IProject>) => {
  const schema = Joi.object({
    type: projectTypeSchema.optional(),
    name: projectNameSchema.optional(),
    isPrivate: isPrivateSchema.optional(),
    description: descriptionSchema.optional(),
    icon: iconSchema.optional(),
    video: videoSchema.optional(),
    featureGraphic: featureGraphicSchema.optional(),
    images: imagesSchema.optional(),
    demoUrl: demoUrlSchema.optional(),
    sourceCodeUrl: sourceCodeUrlSchema.optional()
  })
  return schema.validate(values, { stripUnknown: true })
}
