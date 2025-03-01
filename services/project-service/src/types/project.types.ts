import { Schema } from 'mongoose'

export type ProjectType = 'app' | 'website' | 'game'
export type Platform = 'android' | 'ios'

export interface IProject {
  type: ProjectType
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
