import { DropdownOption } from './components/Dropdown'

export type ToastData = {
  type?: 'success' | 'failure' | 'message' | null
  message?: string | null
}

export type Platform = 'all' | 'android' | 'ios' | 'website'

export type RemoteFile = {
  url: string
  path: string
}

export type ProjectListItem = {
  _id: string
  name: string
  description: string
  icon: string
  categories: string[]
  owner: {
    _id: string
    username: string
  }
}
export type WebsiteListItem = ProjectListItem
export type GameListItem = ProjectListItem & {
  platform: Platform
}
export type AppListItem = ProjectListItem & {
  platform: Platform
}

export type ProjectList<T extends ProjectListItem> = {
  list: T[]
  page: number
  limit: number
  totalPages: number
  isLoading: boolean
  error: string | null
}

export type Banner = {
  _id: string
  image: string
  redirectPath: string
  category: string
  createdAt: string
  updatedAt: string
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
  platform: Platform
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
  platform: Platform
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
  projectType: string
  name: string
  isPrivate: boolean
  description?: string
  icon: RemoteFile
  images: RemoteFile[]
  featureGraphic?: RemoteFile
  video?: RemoteFile
  categories?: string[]
  owner: {
    _id: string
    username: string
    email: string
  }
  sourceCode?: string
  isSourceCodePublic?: boolean
  otherLinks?: string[]
  packageFile?: {
    url: string
    path: string
  }
  platform?: string
  apkInfo?: {
    version: string
    package: string
    minSdkVersion: number
    targetSdkVersion: number
  }
  lastUpdated: string
  createdAt: string
  updatedAt: string
}
