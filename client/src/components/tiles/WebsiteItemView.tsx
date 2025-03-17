import { memo } from 'react'
import { Link } from 'react-router-dom'
import Shimmer from '../Shimmer'
import ProfileImage from '../ProfileImage'
import HeartIcon from '@/assets/icons/heart-outlined.svg?react'
import ShareIcon from '@/assets/icons/share.svg?react'
import { WebsiteListItem } from '@/shared.types'

type WebsiteItemViewProps = {
  websiteItem: WebsiteListItem
}

const WebsiteItemView = ({ websiteItem }: WebsiteItemViewProps) => {
  const { _id, name, icon, banner, owner } = websiteItem

  return (
    <div>
      <Link
        to={`/websites/${_id}`}
        className="relative block aspect-[1.3] overflow-hidden bg-white rounded-lg"
      >
        <img
          className="size-full bg-white object-cover"
          src={banner?.url || icon?.url}
          alt={name}
        />
        <div className="absolute inset-0 bg-black/10">
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
      <div className="flex items-center">
        <ProfileImage imgUrl={owner.profileImage?.url} />
        <div className="m-2 overflow-hidden">
          <p className="text-gray-900 text-15 font-medium overflow-ellipsis">
            {name}
          </p>
          <p className="text-13 text-neutral-600">
            {owner.fullname || owner.username}
          </p>
        </div>
      </div>
    </div>
  )
}

export const WebsiteItemShimmer = () => {
  return (
    <div>
      <Shimmer className="aspect-[1.3] w-full !rounded-lg" />
      <div className="flex items-center gap-2 mt-2">
        <Shimmer className="!size-8 !rounded-full" />
        <Shimmer className="h-8 w-2/3 !rounded-md" />
      </div>
    </div>
  )
}

export const WebsiteItemViewMemo = memo(
  WebsiteItemView,
  (prevProps, nextProps) => {
    return prevProps.websiteItem === nextProps.websiteItem
  }
)

export default WebsiteItemView
