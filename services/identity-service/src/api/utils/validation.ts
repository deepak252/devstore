import Joi from 'joi'
import { IUser } from '../../types/user.types'

const INVALID_USERNAMES = [
  'dev',
  'devstore',
  'store',
  'user',
  'username',
  'checkusername',
  'usernamecheck',
  'profile',
  'apps',
  'games',
  'websites',
  'settings',
  'about',
  'aboutus',
  'privacy',
  'guest',
  'root',
  'admin',
  'administrator',
  'suppert',
  'system',
  'support',
  'moderator',
  'manager',
  'contact',
  'feedback',
  'info',
  'help',
  'account',
  'service',
  'guestuser',
  'customer',
  'login',
  'logout',
  'password',
  'passwordreset',
  'forgotpassword',
  'terms',
  'conditions',
  'termsandconditions',
  'contactus',
  'privacypolicy',
  'auth',
  'authentication',
  'signupform',
  'signinform',
  'sign',
  'signup',
  'signin',
  'login',
  'logout',
  'join',
  'form',
  'main',
  'pricing',
  'project',
  'projects'
]

const usernameSchema = Joi.string()
  .min(3)
  .max(30)
  .regex(/^[a-z0-9]+$/)
  .message('Username should only contain lowercase letters and numbers')
  .invalid(...INVALID_USERNAMES)

const fullnameSchema = Joi.string().min(3).max(40)
const emailSchema = Joi.string().min(3).max(50)
const passwordSchema = Joi.string().min(6).max(30)
const headlineSchema = Joi.string().min(5).max(100).optional()
const bioSchema = Joi.string().min(5).max(4000).optional()

export const validateRegistration = (values: {
  username: string
  fullname: string
  email: string
  password: string
}) => {
  const schema = Joi.object({
    username: usernameSchema.required(),
    fullname: fullnameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required()
  })
  return schema.validate(values, { stripUnknown: true })
}

export const validateLogin = (values: {
  usernameOrEmail: string
  password: string
}) => {
  const schema = Joi.object({
    usernameOrEmail: Joi.string().min(3).max(50).required(),
    password: passwordSchema.required()
  })
  return schema.validate(values)
}

export const validateUpdateProfile = ({
  fullname,
  headline,
  bio
}: Partial<IUser>) => {
  const schema = Joi.object({
    fullname: fullnameSchema.optional(),
    headline: headlineSchema,
    bio: bioSchema
  })
  return schema.validate({ fullname, headline, bio })
}

export const validateCheckUsername = ({ username }: { username: string }) => {
  const schema = Joi.object({
    username: usernameSchema.required()
  })
  return schema.validate({ username })
}
