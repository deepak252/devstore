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
    <div>
      <Link
        to={`/websites/${_id}`}
        className="card relative block aspect-square overflow-hidden bg-white rounded-2xl"
      >
        <img
          className="size-full bg-white object-cover"
          src={icon?.url}
          alt={name}
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100 gradient-bottom-shade">
            <div className="flex flex-col gap-3 absolute top-2 right-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
              >
                <HeartIcon className="size-10 bg-white rounded-full p-3" />
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
      <div className="flex items-center">
        <div className="my-2 overflow-hidden">
          <p className="text-neutral-900 text-lg font-base overflow-ellipsis">
            {name}
          </p>
          <Link
            to={`/u/${owner.username}`}
            className="underline text-neutral-600 text-13 overflow-ellipsis"
          >
            {owner.fullname || owner.username}
          </Link>
        </div>
      </div>
    </div>
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
