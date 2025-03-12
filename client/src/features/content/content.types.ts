import { Platform } from '@/shared.types'
export type Category = {
  _id: string
  name: string
  platform?: Platform
}

export type Banner = {
  _id: string
  imgUrl: string
  redirectUrl: string
  platform?: Platform
}

export type Metadata = {
  categories: Category[]
}
