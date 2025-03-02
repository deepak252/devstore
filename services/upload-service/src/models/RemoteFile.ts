import { Schema, model, Model } from 'mongoose'
import { IRemoteFile, IRemoteFileMethods } from '../types/remoteFile.types'

interface RemoteFileModel
  extends Model<IRemoteFile, object, IRemoteFileMethods> {
  test: () => void
}

const remoteFileSchema = new Schema<
  IRemoteFile,
  RemoteFileModel,
  IRemoteFileMethods
>(
  {
    publicId: {
      type: String,
      required: true
    },
    bucketName: {
      type: String,
      required: true
    },
    originalName: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    mimeType: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)

remoteFileSchema.index({ content: 'text' })

const RemoteFile = model<IRemoteFile, RemoteFileModel>(
  'RemoteFile',
  remoteFileSchema
)

export default RemoteFile
