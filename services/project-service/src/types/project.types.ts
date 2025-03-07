import { Schema } from 'mongoose'
import { Platform, Status } from '../constants/enums'

// export type ProjectType = 'app' | 'website' | 'game'
// export type Platform = 'android' | 'ios'

export interface IProject {
  platform: Platform
  name: string
  owner: Schema.Types.ObjectId
  isPrivate: boolean
  description?: string
  icon?: string
  images?: string[]
  video?: string
  featureGraphic?: string

  demoUrl?: string
  sourceCodeUrl?: string

  status?: Status

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

export interface IProjectMethods {
  test: () => void
  //
}
