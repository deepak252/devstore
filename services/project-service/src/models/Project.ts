import { Schema, model, Model } from 'mongoose'
import { IProject, IProjectMethods } from '../types/project.types'
import { Platform } from '../constants/enums'

interface ProjectModel extends Model<IProject, object, IProjectMethods> {
  test: () => void
}

const projectSchema = new Schema<IProject, ProjectModel, IProjectMethods>(
  {
    platforms: {
      type: [String],
      enum: Object.values(Platform)
    },
    name: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    description: String,
    position: {
      type: Number,
      required: true,
      default: 0
    },
    categories: { type: [String], default: [] },
    icon: {
      type: Schema.Types.ObjectId,
      ref: 'RemoteFile'
    },
    images: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'RemoteFile'
        }
      ],
      default: []
    },
    video: String,
    banner: {
      type: Schema.Types.ObjectId,
      ref: 'RemoteFile'
    },
    demoUrl: String,
    sourceCodeUrl: String,
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

projectSchema.index({ name: 'text' })

const Project = model<IProject, ProjectModel>('Project', projectSchema)

export default Project
