import { Schema } from 'mongoose'
import { Platform } from '../constants/enums'

export interface IProject {
  _id: string
  platform: Platform
  name: string
  owner: Schema.Types.ObjectId
  isPrivate: boolean
  description?: string
  icon?: string
  images?: string[]
  video?: string
  banner?: string

  demoUrl?: string
  sourceCodeUrl?: string

  active?: boolean

  // Apps

  // package: {
  //   platform: Platform
  //   info: any
  // }

  // packageFile: remoteFileSchema
  // platform: {
  //   type: String
  //   enum: PLATFORM
  //   default: PLATFORM.ANDROID
  // }
  // apkInfo: {
  //   type: apkInfoSchema
  // }
  // ipaInfo: {
  //   type: ipaInfoSchema
  // }

  createdAt: Date
  updatedAt: Date
}
