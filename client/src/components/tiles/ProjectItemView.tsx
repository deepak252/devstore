import { memo } from 'react'
import { Link } from 'react-router-dom'
import Shimmer from '../Shimmer'
import ProfileImage from '../ProfileImage'
import HeartOutlinedIcon from '@/assets/icons/heart-outlined.svg?react'
import HeartFilledIcon from '@/assets/icons/heart-filled.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import { ProjectListItem } from '@/shared.types'

type ProjectItemViewProps = {
  project: ProjectListItem
}

const ProjectItemView = ({ project }: ProjectItemViewProps) => {
  const { _id, name, icon, banner, owner } = project

  return (
    <div>
      <Link
        to={`/projects/${_id}`}
        className="relative block aspect-[1.3] overflow-hidden bg-white rounded-lg group"
      >
        <img
          className="size-full bg-white object-cover duration-300 transition-all group-hover:scale-110"
          src={banner?.url || icon?.url}
          alt={name}
        />
        <div className="absolute inset-0 bg-black/10">
          <div className=" absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 gradient-project-item">
            {/* <div className="flex gap-4 absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <ShareIcon className="size-6 rounded-full !stroke-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <HeartOutlinedIcon className="size-6 rounded-full !stroke-white" />
              </button>
            </div> */}
            <div className="flex gap-3 absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <ShareIcon className="size-10 bg-white rounded-full p-2.5 " />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <HeartOutlinedIcon className="size-10 bg-white rounded-full p-3 " />
              </button>
            </div>
            <div className="absolute bottom-4 left-4">
              <p className="text-lg text-white overflow-ellipsis md:text-xl">
                {name}
              </p>
            </div>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center my-2">
        <Link className="flex items-center" to={`/u/${owner.username}`}>
          <ProfileImage className="!size-7" imgUrl={owner.profileImage?.url} />
          <div className="m-2 overflow-hidden">
            <p className="text-sm font-medium text-neutral-900 md:text-base">
              {owner.fullname || owner.username}
            </p>
          </div>
        </Link>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <HeartFilledIcon className="size-5 rounded-full fill-neutral-500" />
          </button>
          <span className="text-sm text-neutral-600">84</span>
        </div>
      </div>
    </div>
  )
}

export const ProjectItemShimmer = () => {
  return (
    <div>
      <Shimmer className="aspect-[1.3] w-full !rounded-lg" />
      <div className="flex items-center gap-2 mt-2">
        <div>
          <Shimmer className="!size-8 !rounded-full" />
        </div>
        <Shimmer className="h-8 w-2/3 !rounded-md" />
      </div>
    </div>
  )
}

export const ProjectItemViewMemo = memo(
  ProjectItemView,
  (prevProps, nextProps) => {
    return prevProps.project === nextProps.project
  }
)

export default ProjectItemView
