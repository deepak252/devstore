import { Schema } from 'mongoose'
import { Platform } from '../constants/enums'

export interface IBanner {
  img: Schema.Types.ObjectId
  project: Schema.Types.ObjectId
  redirectUrl: string
  active?: boolean
  platforms?: Platform[]
  createdAt: Date
  updatedAt: Date
}

export interface IBannerMethods {
  test: () => void
}
