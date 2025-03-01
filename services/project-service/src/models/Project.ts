import { Schema, model, Model } from 'mongoose'
import { IProject, IProjectMethods } from '../types/project.types'
import { ProjectType } from '../constants/enums'

interface ProjectModel extends Model<IProject, object, IProjectMethods> {
  test: () => void
}

const projectSchema = new Schema<IProject, ProjectModel, IProjectMethods>(
  {
    type: {
      type: String,
      enum: Object.values(ProjectType)
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
    icon: String,
    images: [
      {
        type: String
      }
    ],
    video: String,
    featureGraphic: String,
    demoUrl: String,
    sourceCodeUrl: String
  },
  {
    timestamps: true
  }
)

projectSchema.index({ name: 'text' })

const Project = model<IProject, ProjectModel>('Project', projectSchema)

export default Project
