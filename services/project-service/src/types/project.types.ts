import { Schema } from 'mongoose'
import { Platform } from '../constants/enums'

// export type ProjectType = 'app' | 'website' | 'game'
// export type Platform = 'android' | 'ios'

export interface IProject {
  platforms: Platform[]
  name: string
  owner: Schema.Types.ObjectId
  isPrivate: boolean
  position: number
  description?: string
  categories?: []
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

export interface IProjectMethods {
  test: () => void
  //
}
