import { memo } from 'react'
import { Link } from 'react-router-dom'
import Shimmer from '../Shimmer'
import HeartIcon from '@/assets/icons/heart-outlined.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import { AppListItem } from '@/shared.types'

type AppItemViewProps = {
  appItem: AppListItem
}

const AppItemView = ({ appItem }: AppItemViewProps) => {
  const { _id, name, icon, owner } = appItem

  return (
    <Link
      to={`/apps/${_id}`}
      className="relative flex flex-col overflow-hidden rounded-2xl p-2 hover:bg-gray-1100 hover:opacity-80"
    >
      <img
        src={icon?.url}
        className="card size-full aspect-square"
        alt="app_icon"
      />
      <div className="flex items-center gap-2 mt-2">
        {/* <img
          className="card size-14 aspect-square max-lg:size-12"
          src={iconUrl}
          alt="icon"
        /> */}
        {/* <ProfileImage imgUrl={owner.profileImage?.url} className="!size-7" /> */}
        <div className="my-1 overflow-hidden">
          <p className="text-neutral-900 text-lg font-base overflow-ellipsis">
            {name}
          </p>
          <p className="text-13 text-neutral-600 overflow-ellipsis underline">
            {owner.fullname || owner.username}
          </p>
          {/* {rating && (
            <p className="">
              {rating} <StarIcon className="size-4" />
            </p>
          )} */}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/0">
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 gradient-bottom-shade">
          <div className="flex flex-col gap-3 absolute top-2 right-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <HeartIcon className="size-10 bg-white rounded-full p-3 " />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              <ShareIcon className="size-10 bg-white rounded-full p-2.5 " />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const AppItemShimmer = () => {
  return (
    <div>
      <Shimmer className="aspect-square !rounded-lg" />
      <Shimmer className="h-8 w-2/3 !rounded-md mt-2" />
    </div>
  )
}

export const AppItemViewMemo = memo(AppItemView, (prevProps, nextProps) => {
  return prevProps.appItem === nextProps.appItem
})

export default AppItemView
