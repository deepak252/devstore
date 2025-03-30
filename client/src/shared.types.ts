import { DropdownOption } from './components/Dropdown'

export type ToastData = {
  type?: 'success' | 'failure' | 'message' | null
  message?: string | null
}

export type Platform = 'all' | 'android' | 'ios' | 'website'
export type ProjectType = 'all' | 'app' | 'web'

export type RemoteFile = {
  _id: string
  url: string
  path?: string
  mimeType?: string
}

export type Owner = {
  _id: string
  username: string
  fullname?: string
  profileImage?: RemoteFile
}

export type ProjectListItem = {
  _id: string
  name: string
  description?: string
  icon?: RemoteFile
  banner?: RemoteFile
  // categories: string[]
  owner: Owner
  platform?: Platform
}
export type WebsiteListItem = ProjectListItem
export type GameListItem = ProjectListItem
export type AppListItem = ProjectListItem

export type ProjectList<T extends ProjectListItem> = {
  list: T[]
  page: number
  limit: number
  totalPages: number
  isLoading: boolean
}

export type PaginatedList<T> = {
  list: T[]
  page: number
  limit: number
  totalPages: number
  totalResults: number
  isLoading: boolean
}

export type Banner = {
  _id: string
  img: RemoteFile
  redirectUrl: string
  path: string
}

// platform: Platform
//   name: string
//   owner: Schema.Types.ObjectId
//   isPrivate: boolean
//   description?: string
//   icon?: string
//   images?: string[]
//   video?: string
//   featureGraphic?: string

//   demoUrl?: string
//   sourceCodeUrl?: string

// type Attachment = {
//   file?: File | null
//   url?: string
//   publicId?: string
// }

export type ProjectFormValues = {
  name: string
  description?: string
  isPrivate: boolean
  platforms: DropdownOption[]
  categories?: DropdownOption[]
  sourceCodeUrl?: string
  demoUrl?: string
  icon?: string
  images?: string[]
  banner?: string
  attachmentIcon?: File
  attachmentImages?: {
    id: string
    file: File
  }[]
  attachmentBanner?: File
  // icon?: Attachment
  // images?: Attachment[]
  // featureImage?: Attachment
  // attachmentIcon?: File | null
  // attachmentImages?: File[] | null
  // attachmentFeature?: File | null
}

export type ProjectFormError = {
  name?: string
  description?: string
  platforms?: string
  isPrivate?: string
  categories?: string
  sourceCodeUrl?: string
  demoUrl?: string
  attachmentIcon?: string
  attachmentImages?: string
  attachmentBanner?: string
}

export type SaveProjectPayload = {
  name: string
  platforms: Platform[]
  isPrivate: boolean
  description?: string
  categories?: string[]
  sourceCodeUrl?: string
  demoUrl?: string
}

export type UploadProjectMediaPayload = {
  attachmentIcon?: File
  attachmentImages?: File[]
  attachmentBanner?: File
}
// export type ProjectFormValues = {
//   name: string
//   description?: string
//   categories?: []
//   sourceCode?: string
//   isSourceCodePublic?: boolean
//   isPrivate: boolean
//   attachmentIcon: File | null
//   attachmentImages: File[] | null
//   attachmentVideo?: File | null
//   attachmentGraphic?: File | null
// }

// export type ProjectFormError = {
//   name?: string
//   description?: string
//   categories?: string
//   sourceCode?: string
//   isSourceCodePublic?: string
//   isPrivate?: string
//   attachmentIcon?: string
//   attachmentImages?: string
//   attachmentVideo?: string
//   attachmentGraphic?: string
// }

export type ProjectDetails = {
  _id: string
  platforms: Platform[]
  name: string
  isPrivate: boolean
  description?: string
  categories?: string[]
  icon: RemoteFile
  banner?: RemoteFile
  images: RemoteFile[]
  owner: Owner
  demoUrl?: string
  sourceCodeUrl?: string
  otherLinks?: string[]
  packageFile?: {
    url: string
    path: string
  }
  apkInfo?: {
    version: string
    package: string
    minSdkVersion: number
    targetSdkVersion: number
  }
  createdAt: string
  updatedAt: string
}
