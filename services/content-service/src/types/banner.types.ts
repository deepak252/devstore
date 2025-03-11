import { Platform } from '../constants/enums'

export interface IBanner {
  imgUrl: string
  redirectUrl: string
  platform?: Platform
  ref?: string
  createdAt: Date
  updatedAt: Date
}

export interface IBannerMethods {
  test: () => void
}
