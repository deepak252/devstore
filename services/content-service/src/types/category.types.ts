import { Platform } from '../constants/enums'

export interface ICategory {
  name: string
  platform: Platform
  createdAt: Date
  updatedAt: Date
}

export interface ICategoryMethods {
  test: () => void
}
