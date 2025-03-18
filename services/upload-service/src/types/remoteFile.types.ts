import { Schema } from 'mongoose'

export interface IRemoteFile {
  publicId: string
  bucketName: string
  originalName: string
  url: string
  mimeType: string
  user: Schema.Types.ObjectId
  fileType?: string // profile-image, project-banner
  parentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface IRemoteFileMethods {
  test: () => void
  //
}
