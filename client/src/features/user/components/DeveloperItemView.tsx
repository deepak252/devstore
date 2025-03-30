import { memo } from 'react'
import ProfileImage from '@/components/ProfileImage'
import Shimmer from '@/components/Shimmer'
import { User } from '../user.types'
import { Link } from 'react-router-dom'

const DeveloperItemView = ({ user }: { user: User }) => {
  return (
    <Link to={`/u/${user.username}`}>
      <div className="flex gap-4 py-6">
        <ProfileImage className="!size-16" imgUrl={user.profileImage?.url} />
        <div className="w-full flex justify-between items-start gap-8">
          <div className="">
            <p className="text-lg font-medium text-neutral-900">
              {user.fullname || user.username}
            </p>
            <p className="text-sm text-neutral-600 font-light">
              {user.title} {user.title && user.headline && <span> | </span>}
              {user.headline}
            </p>
          </div>
          <button
            className="btn-outlined py-2"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            Follow
          </button>
        </div>
      </div>
    </Link>
  )
}

export const DeveloperItemShimmer = () => {
  return (
    <div className="flex gap-2 py-6">
      <div>
        <Shimmer className="!size-16 !rounded-full" />
      </div>
      <Shimmer />
    </div>
  )
}

export const DeveloperItemViewMemo = memo(
  DeveloperItemView,
  (prevProps, nextProps) => {
    return prevProps.user === nextProps.user
  }
)

export default DeveloperItemView
